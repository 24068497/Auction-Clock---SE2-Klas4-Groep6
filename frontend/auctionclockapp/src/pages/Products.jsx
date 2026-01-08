import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString();
}

export default function Products() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRole(
                    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
                );
            } catch (err) {
                console.error("Token decode fout", err);
            }
        }
    }, []);


    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            setError('');
            try {
                const res = await fetch("http://localhost:5164/api/products");

                if (!res.ok) {
                    const msg = await res.text().catch(() => '');
                    throw new Error(`Fout bij laden: ${res.status} ${msg}`);
                }

                const json = await res.json();
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
                    <>
                        <div className="row">
                            {data.length === 0 && (
                                <div className="col-12">
                                    <div className="alert alert-info">
                                        Geen producten gevonden.
                                    </div>
                                </div>
                            )}

                            {data.map(p => (
                                <div
                                    key={p.productId}
                                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                                >
                                    <div className="card h-100 shadow-sm">
                                        <img
                                            src={`http://localhost:5164${p.imagePath}`}
                                            alt={p.name}
                                            className="card-img-top product-image"
                                        />

                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title mb-1">{p.name}</h5>
                                            <hr />

                                            <ul className="list-unstyled mb-3">
                                                <li>
                                                    <strong>Startprijs:</strong> €
                                                    {Number(p.startPrice).toFixed(2)}
                                                </li>
                                                <li>
                                                    <strong>Veilingdatum:</strong>{' '}
                                                    {formatDate(p.auctionDate)}
                                                </li>
                                            </ul>

                                            <div className="mt-auto d-grid text-break">
                                                <Link
                                                    to={`/product/${p.productId}`}
                                                    className="btn bg-footer text-white mb-2"
                                                >
                                                    Meer over {p.name}
                                                </Link>

                                                {role === "Auctioneer" && (
                                                    <Link
                                                        to={`/auction/addtime/${p.productId}`}
                                                        className="btn bg-nav text-dark"
                                                    >
                                                        Bepaal veilingstijden
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Product toevoegen knop */}
                        {role === 'Verkoper' && (
                            <div className="text-center mt-4">
                                <Link
                                    to="/product/add"
                                    className="btn  bg-footer text-white"
                                >
                                    Product toevoegen
                                </Link>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
