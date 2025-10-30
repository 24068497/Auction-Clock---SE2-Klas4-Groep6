import React, { useState } from 'react';

const GeneralInformation = () => {

    const [toggle, setToggle] = useState(false)
    return (
        <div>
            <button onClick={() => setToggle(!toggle)} className='generalInformationBtn btnStyle'>Algemene informatie</button>

            {toggle && (
                <article className='generalInformation'>
                    <h6>Wij verwerken de volgende onderdelen op onze website:</h6>
                    <ul>
                        <li>Identificatiegegevens: naam, adres, telefoonnummer, e-mailadres, klantnummer.</li>
                        <li>Zakelijke gegevens: naam, adres, KvK-nummer, bankrekeningnummer(beveiligd).</li>
                        <li>Inloggegevens: gebruikersnaam, wachtwoord (versleuteld), accountinstellingen.</li>
                        <li>Transactiegegevens: koop- en verkoopgeschiedenis, biedingen, facturen, betaalgegevens.</li>
                        <li>Autorisatie: na succesvolle authenticatie krijgt iedere gebruiker alleen toegang tot die onderdelen van het platform die nodig zijn voor het uitvoeren van zijn of haar rol. Zo hebben kopers beperkte toegang tot hun eigen gegevens. Terwijl de veilingmeester en productaanbieder uitsluitend toegang hebben tot gegevens die nodig zijn voor het beheer van het platform.</li>
                        <li>Authenticatie: Toegang tot accounts is beveiligd met een unieke gebruikersnaam en een versleuteld wachtwoord.</li>
                    </ul>

                    <br />
                    <h6>Rechten van de consument</h6>
                    U heeft het recht om:<br />
                    <ul>
                        <li>Inzage te vragen in uw persoonsgegevens.</li>
                        <li>Uw gegevens te laten corrigeren of verwijderen.</li>
                        <li>Beperking van verwerking te vragen.</li>
                        <li>Recht om vergeten te worden.</li>
                    </ul>
                </article>
            )}
        </div>
    )
}

const CompanyInformation = () => {
    const [toggle, setToggle] = useState(false)

    return (
        <div>
            <button onClick={() => setToggle(!toggle)} className='companyInformationBtn btnStyle'>Verwerking bedrijfsgegevens</button>

            {toggle && (
                <article className='companyInformation'>
                    <h6>De volgende bedrijfsgegevens worden bij ons verwerkt:</h6>
                    <ul>
                        <li>Identificatiegegevens: naam, adres, telefoonnummer, e-mailadres, klantnummer.</li>
                        <li>Zakelijke gegevens: naam, adres, KvK-nummer, bankrekeningnummer(beveiligd).</li>
                        <li>Inloggegevens: gebruikersnaam, wachtwoord (versleuteld), accountinstellingen.</li>
                        <li>Transactiegegevens: koop- en verkoopgeschiedenis, biedingen, facturen, betaalgegevens.</li>
                        <li>Autorisatie: na succesvolle authenticatie krijgt iedere gebruiker alleen toegang tot die onderdelen van het platform die nodig zijn voor het uitvoeren van zijn of haar rol. Zo hebben kopers beperkte toegang tot hun eigen gegevens. Terwijl de veilingmeester en productaanbieder uitsluitend toegang hebben tot gegevens die nodig zijn voor het beheer van het platform.</li>
                        <li>Authenticatie: Toegang tot accounts is beveiligd met een unieke gebruikersnaam en een versleuteld wachtwoord.</li>
                    </ul>
                </article>
            )}
        </div>
    )
}

const PersonInformation = () => {
    const [toggle, setToggle] = useState(false)

    return (
        <div>
            <button onClick={() => setToggle(!toggle)} className='personInformationBtn btnStyle'>Verwerking persoonsgegevens</button>

            {toggle && (
                <article className='personInformation'>
                    <p>Beveiliging van gegevens: uw login gegevens (zoals een email en wachtwoord) worden met behulp van een hash systeem onherkenbaar gemaakt. De overige gevoelige gegevens zoals uw naam en telefoonnummer worden met behulp van encryptie versleuteld voordat uw gegevens in het systeem geplaatst worden.</p>

                    <h6>Wij verzamelen van u de volgende gegevens:</h6>

                    <ul>
                        <li>Inloggegevens (emailadres en wachtwoord)</li>
                        <li>Naam</li>
                        <li>Telefoonnummer</li>
                        <li>Bestelhistorie</li>
                    </ul>

                    <p>Beveiliging bestelhistorie: Uw bestellingen bij ons worden alleen aan u en de systeembeheerder getoond, voor deze aanpak is gekozen omdat de systeembeheerder er is om de website werkend te houden.</p>
                    <p>De systeembeheerder moet eerst op zijn eigen dashboard inloggen voordat hij bij uw gegevens kan.</p>
                    <p>Bewaartermijn persoonsgegevens: Uw gegevens worden alleen bewaard zolang u een account bij ons heeft. Verwijderd u uw account? Dan worden uw gegevens direct verwijderd uit ons systeem.</p>

                    <p>Doel van de opgeslagen gegevens: Wij verzamelen alleen de strikt noodzakelijke gegevens over u die nodig zijn om het proces zo goed mogelijk te laten draaien en u een goede service te kunnen bieden.</p>
                    <p>Wijziging van gegevens: Zit er een fout of is er een wijziging in de opgeslagen gegevens die wij van u verzamelen ? Dan heeft u het recht om uw gegevens aan te passen, zodat deze gegevens wel kloppend zijn.</p>
                </article>
            )}
        </div>
    )
}

function AllInformation ()
{
    return (
        <>
            <GeneralInformation />
            <CompanyInformation />
            <PersonInformation />
        </>

    )
}

class Privacy extends React.Component {
    render() {
        return (
            <div class='container'>
                <AllInformation />
            </div>
        );
    }
}

export default Privacy;