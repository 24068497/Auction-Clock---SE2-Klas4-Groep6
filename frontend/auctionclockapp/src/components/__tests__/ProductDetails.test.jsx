import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock react-router id
vi.mock('react-router-dom', () => ({
    useParams: () => ({ id: '1' }),
}));

import ProductDetails from '../ProductDetails';

describe('ProductDetails', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('toont product data na succesvolle fetch', async () => {
        const mockProduct = {
            productId: 1,
            name: 'Mock Product 1',
            description: 'Mock Desc 1',
            startPrice: 12,
            auctionDate: '2026-01-15T00:00:00.000Z',
            imagePath: '/img/mock1.jpg',
        };

        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => mockProduct,
        });

        render(<ProductDetails />);

        expect(await screen.findByText('Mock Product 1')).toBeInTheDocument();
        expect(screen.getByText(/Productbeschrijving:/)).toHaveTextContent('Mock Desc 1');
        expect(screen.getByText(/Startprijs:/)).toHaveTextContent('€12.00');

        const img = screen.getByRole('img', { name: 'Mock Product 1' });
        expect(img).toHaveAttribute('src', 'http://localhost:5164/img/mock1.jpg');

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:5164/api/products/1');
    });

    it('toont "Geen product gevonden" bij backend error', async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 404,
            text: async () => 'Not Found',
        });

        render(<ProductDetails />);

        expect(await screen.findByText('Geen product gevonden')).toBeInTheDocument();
    });
});
