using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Concrete.EfCore
{
    public class MMContext : DbContext
    {
        public MMContext(DbContextOptions<MMContext> options): base(options) { }

    }
}
