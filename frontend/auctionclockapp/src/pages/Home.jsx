import React from "react";

class Home extends React.Component {
    render() {
        return (
            <>
            <title>Home</title>
            <div class="container-fluid">

                <div class="row">
                    <div class="col-lg-6 col-md-12">
                        <article class="m-4">
                            <h2>Welkom bij de veilingklok van RoyalFloraHolland</h2>
                            <p>
                                Bloemen en planten maken onze wereld groener.<br />
                                Ze kleuren onze huizen, tuinen en buurten en vergroenen onze steden.<br />
                                Een groene omgeving maakt mensen gelukkig en het werkt stressverlagend.<br />
                            </p>
                    
                            <p>
                                Onze coöperatie is een twee-eenheid: we zijn een vereniging én een bedrijf.<br />
                                We hebben twee doelen: een gezonde en aantrekkelijke coöperatie voor onze leden zijn en blijven én bouwen aan het grootste internationale B2B platform binnen de sierteeltsector.<br />
                                Duurzaamheid is hierbij een belangrijk fundament. Door bundeling van kennis en kracht bereiken we duurzaam succes, internationale groei en versterken we de coöperatie.<br />
                                Om voorop te blijven lopen, nu en in de toekomst.
                            </p>
                        </article>
                    </div>

                    <div class="col-lg-6 col-md-12 mt-4">
                        <div class="ratio ratio-16x9">
                            <iframe src="https://www.youtube.com/embed/nDMpvh0puSU?si=BPKTxo5ZVoW4DB_C" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
                </div>
            </>
        );
    }
}

export default Home;