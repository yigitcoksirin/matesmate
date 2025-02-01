using Microsoft.AspNetCore.Identity;

namespace MatesMate.Server.Identity
{
    public class User : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}
