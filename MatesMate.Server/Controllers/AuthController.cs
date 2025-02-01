using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MatesMate.Server.Identity;
using MatesMate.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using MatesMate.Server.ExtraMethods;

namespace MatesMate.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMethods _methods;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration, IMethods methods)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _methods = methods;
        }


        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody] AuthModel authModel)
        {
            if (ModelState.IsValid)
            {
                if (authModel != null)
                {
                    var user = new User()
                    {
                        UserName = authModel.Username
                    };

                    var result = await _userManager.CreateAsync(user, authModel.Password);

                    if (result.Succeeded)
                    {
                        return Ok(new { message = "Registration Successful" });
                    }
                    else
                    {
                        Console.WriteLine(result);
                        return BadRequest();
                    }
                }
            }
            return BadRequest("Invalid registration details");
        }



        [HttpPost]
        [Route("get-token")]
        public async Task<IActionResult> GetToken([FromBody] AuthModel authModel)
        {
            var user = await _userManager.FindByNameAsync(authModel.Username);
            if (user != null && await _userManager.CheckPasswordAsync(user, authModel.Password))
            {
                var jwtSettings = _configuration.GetSection("Token");
                var secretKey = jwtSettings.GetValue<string>("SecurityKey");
                var issuer = jwtSettings.GetValue<string>("Issuer");
                var audience = jwtSettings.GetValue<string>("Audience");
                var expiration = jwtSettings.GetValue<int>("Expiration");



                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                    new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                var roles = await _userManager.GetRolesAsync(user);
                foreach(var role in roles)
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }

                var claimsIdentity = new ClaimsIdentity(claims);

                var _secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
                var signingCredentials = new SigningCredentials(_secretKey, SecurityAlgorithms.HmacSha256);

                var tokenHandler = new JwtSecurityTokenHandler();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claimsIdentity,
                    Expires = DateTime.UtcNow.AddMinutes(expiration),
                    SigningCredentials = signingCredentials,
                    Audience = audience,
                    Issuer = issuer
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);

                var jwtToken = tokenHandler.WriteToken(token);

                var refreshToken = _methods.GenerateRefreshToken();
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
                await _userManager.UpdateAsync(user);

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddMinutes(expiration),
                };

                Response.Cookies.Append("authToken" ,jwtToken, cookieOptions);

                return Ok(new
                { 
                    token = jwtToken,
                    refreshToken = refreshToken,
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] string refreshToken)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiryTime < DateTime.UtcNow)
            {
                return Unauthorized(new { message = "Invalid or expired refresh token" });
            }

            var jwtSettings = _configuration.GetSection("Token");
            var secretKey = jwtSettings.GetValue<string>("SecurityKey");
            var issuer = jwtSettings.GetValue<string>("Issuer");
            var audience = jwtSettings.GetValue<string>("Audience");
            var expiration = jwtSettings.GetValue<int>("Expiration");

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Name, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var claimsIdentity = new ClaimsIdentity(claims);
            var _secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var signingCredentials = new SigningCredentials(_secretKey, SecurityAlgorithms.HmacSha256);
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                Expires = DateTime.UtcNow.AddMinutes(expiration),
                SigningCredentials = signingCredentials,
                Audience = audience,
                Issuer = issuer
            };

            var newToken = tokenHandler.CreateToken(tokenDescriptor);
            var newJwtToken = tokenHandler.WriteToken(newToken);

            var newRefreshToken = _methods.GenerateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddMinutes(expiration),
            };

            Response.Cookies.Append("authToken", newJwtToken, cookieOptions);

            var refreshCookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7),
            };

            Response.Cookies.Append("refreshToken", newRefreshToken, refreshCookieOptions);

            return Ok(new
            {
                token = newJwtToken,
                refreshToken = newRefreshToken
            });
        }


    }
}
