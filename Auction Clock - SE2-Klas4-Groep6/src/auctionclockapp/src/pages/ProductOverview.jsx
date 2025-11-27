import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
}
export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

        async function loadProduct() {
            setLoading(true);
            setError('');
            try {
                const res = await fetch(`http://localhost:5164/api/products/${id}`);

                if (!res.ok) {
                    const msg = await res.text().catch(() => '');
                    throw new Error(`Fout bij laden: ${res.status} ${msg}`);
                }

                const json = await res.json();
                setProduct(json);
            } catch (e) {
                setError(e.message || 'Er ging iets mis');
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    if (!product)
     return <p className="p-2">Geen product gevonden</p>;

    return (
        <div className="container">

            <div className="row mt-4 p-2">

                <div className="col-md-6 col-sm-12 my-1">
                    <img src={`http://localhost:5164${product.imagePath}`} alt={product.name} width="100%" className="float-md-end d-block mx-auto" />
                </div>

                <div className="col-md-6 col-sm-12 my-1 border bg-light">
                    <div className="p-1">
                        <h4>{product.name}</h4>
                        <hr></hr>
                        <article>Productbeschrijving: {product.description}</article>
                        <br></br>
                        <p>Startprijs: €{product.startPrice.toFixed(2)}</p>
                        <p>Veildatum: {formatDate(product.auctionDate)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}