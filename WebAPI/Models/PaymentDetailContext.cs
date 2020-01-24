using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class PaymentDetailContext : DbContext
    {
        public PaymentDetailContext(DbContextOptions<PaymentDetailContext> options) : base(options)
        {
                
        }

        // criando método referenciando minha model 'PaymentDetail' e colocando o nome no plural como padrão
        public DbSet<PaymentDetail> paymentDetails { get; set; }
    }
}
