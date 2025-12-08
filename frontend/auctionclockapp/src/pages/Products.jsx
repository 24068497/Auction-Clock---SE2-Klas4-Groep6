import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
}

export default function Products() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const from = today.toISOString();

        async function loadProducts() {
            setLoading(true);
            setError('');
            try {
                const params = new URLSearchParams({
                    from,
                    sort: 'AuctionDate',
                    order: 'asc',
                    page: '1',
                    pageSize: '12'
                });

                const res = await fetch("http://localhost:5164/api/products");

                if (!res.ok) {
                    const msg = await res.text().catch(() => '');
                    throw new Error(`Fout bij laden: ${res.status} ${msg}`);
                }
                const json = await res.json();
                setData(json);
                json.sort((a, b) => new Date(a.auctionDate) - new Date(b.auctionDate));
                setData(json);
            } catch (e) {
                setError(e.message || 'Er ging iets mis');
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, []);

    return (
        <>
        <title>Productoverzicht</title>
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-12 text-center">
                    <h2>Producten in de veiling</h2>
                    <p className="text-muted">
                        Bekijk een selectie van producten die binnenkort geveild worden.
                    </p>
                </div>
            </div>

            {loading && <p>Bezig met laden…</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
                <div className="row">
                    {data.length === 0 && (
                        <div className="col-12">
                            <div className="alert alert-info">Geen producten gevonden.</div>
                        </div>
                    )}

                    {data.map(p => (
                        <div key={p.productId} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title mb-1">{p.name}</h5>
                                    <hr></hr>
                                    <ul className="list-unstyled mb-3">
                                        <li><strong>Startprijs:</strong> € {Number(p.startPrice).toFixed(2)}</li>
                                        <li><strong>Minimumprijs:</strong> € {Number(p.minimumPrice).toFixed(2)}</li>
                                        <li><strong>Veilingdatum:</strong> {formatDate(p.auctionDate)}</li>
                                    </ul>

                                    <div className="mt-auto d-grid text-break">
                                        <button className="btn bg-footer">
                                            <Link to={`/product/${p.productId}`} class="nav-link text-white">Meer over {p.name}</Link>
                                        </button>
                                        <hr></hr>
                                        <button className="btn bg-nav">
                                            <Link to={`/auction/addtime/${p.productId}`} class="nav-link text-dark">Bepaal veilingstijden</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <button class="btn bg-footer"><Link to='/product/add' class="nav-link text-white">Product toevoegen</Link></button>
            </div>
        </>
    );
}
