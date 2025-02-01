using System.Security.Cryptography;

namespace MatesMate.Server.ExtraMethods
{
    public class Methods : IMethods
    {
        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }
    }
}
