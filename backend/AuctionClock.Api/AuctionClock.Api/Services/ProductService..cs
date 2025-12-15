using System;
using Auction_Clock___SE2_Klas4_Groep6.Models;

namespace Auction_Clock___SE2_Klas4_Groep6.Services
{
    public class ProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public Product VoegProductToe(Product product)
        {
            // Controle minimumprijs
            if (product.MinimumPrice > product.StartPrice)
                throw new ArgumentException("Minimumprijs mag niet hoger zijn dan startprijs.");

            // Controle veilingdatum
            if (product.AuctionDate < DateTime.Now)
                throw new ArgumentException("Veilingdatum mag niet in het verleden liggen.");

            // Product toevoegen via repository
            return _repository.Add(product);
        }
    }
}