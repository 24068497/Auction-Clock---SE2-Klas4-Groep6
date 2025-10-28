import React, { useState } from 'react';

const GeneralInformation = () => {

    const [toggle, setToggle] = useState(true)
    return (
        <div>
            <button onclick={() => setToggle(!toggle)} className='generalInformationBtn'>Algemene informatie</button>

            {toggle && (
                <article className='generalInformation'>
                    <h6>Wij verwerken de volgende onderdelen op onze website:</h6>
                    -	Identificatiegegevens: naam, adres, telefoonnummer, e-mailadres, klantnummer.<br />
                    -	Zakelijke gegevens: naam, adres, KvK-nummer, bankrekeningnummer(beveiligd).<br />
                    -	Inloggegevens: gebruikersnaam, wachtwoord (versleuteld), accountinstellingen.<br />
                    -	Transactiegegevens: koop- en verkoopgeschiedenis, biedingen, facturen, betaalgegevens.<br />
                    -	Autorisatie: na succesvolle authenticatie krijgt iedere gebruiker alleen toegang tot die onderdelen van het platform die nodig zijn voor het uitvoeren van zijn of haar rol. Zo hebben kopers beperkte toegang tot hun eigen gegevens. Terwijl de veilingmeester en productaanbieder uitsluitend toegang hebben tot gegevens die nodig zijn voor het beheer van het platform.<br />
                    -	Authenticatie: Toegang tot accounts is beveiligd met een unieke gebruikersnaam en een versleuteld wachtwoord.<br />
                    <br />
                    <h6>Rechten van de consument</h6>
                    U heeft het recht om:<br />
                    -	Inzage te vragen in uw persoonsgegevens.<br />
                    -	Uw gegevens te laten corrigeren of verwijderen.<br />
                    -	Beperking van verwerking te vragen.<br />
                    -	Recht om vergeten te worden<br />
                </article>
            )}
        </div>
    )
}

const CompanyInformation = () => {
    const [toggle, setToggle] = useState(true)

    return (
        <div>
            <button onclick={() => setToggle(!toggle)} className='companyInformationBtn'>Verwerking bedrijfsgegevens</button>

            {toggle && (
                <article className='companyInformation'>
                    Wij verwerken de volgende onderdelen op onze website:
                    -	Identificatiegegevens: naam, adres, telefoonnummer, e-mailadres, klantnummer.
                    -	Zakelijke gegevens: naam, adres, KvK-nummer, bankrekeningnummer(beveiligd).
                    -	Inloggegevens: gebruikersnaam, wachtwoord (versleuteld), accountinstellingen.
                    -	Transactiegegevens: koop- en verkoopgeschiedenis, biedingen, facturen, betaalgegevens.
                    -	Autorisatie: na succesvolle authenticatie krijgt iedere gebruiker alleen toegang tot die onderdelen van het platform die nodig zijn voor het uitvoeren van zijn of haar rol. Zo hebben kopers beperkte toegang tot hun eigen gegevens. Terwijl de veilingmeester en productaanbieder uitsluitend toegang hebben tot gegevens die nodig zijn voor het beheer van het platform.
                    -	Authenticatie: Toegang tot accounts is beveiligd met een unieke gebruikersnaam en een versleuteld wachtwoord.

                    Rechten van de consument
                    U heeft het recht om:
                    -	Inzage te vragen in uw persoonsgegevens.
                    -	Uw gegevens te laten corrigeren of verwijderen.
                    -	Beperking van verwerking te vragen.
                    -	Recht om vergeten te worden
                </article>
            )}
        </div>
    )
}

const PersonInformation = () => {
    const [toggle, setToggle] = useState(true)

    return (
        <div>
            <button onclick={() => setToggle(!toggle)} className='personInformation'>Verwerking persoonsgegevens</button>

            {toggle && (
                <article className='personInformation'>
                    Verwerking Persoonsgegevens
                    Beveiliging van gegevens: uw login gegevens (zoals een email en wachtwoord) worden met behulp van een hash systeem onherkenbaar gemaakt. De overige gevoelige gegevens zoals uw naam en telefoonnummer worden met behulp van encryptie versleuteld voordat uw gegevens in het systeem geplaatst worden.

                    Wij verzamelen van u de volgende gegevens:
                    -	Inloggegevens (emailadres en wachtwoord)
                    -	Naam
                    -	Telefoonnummer
                    -	Bestelhistorie

                    Beveiliging bestelhistorie: Uw bestellingen bij ons worden alleen aan u en de systeembeheerder getoond, voor deze aanpak is gekozen omdat de systeembeheerder er is om de website werkend te houden.
                    De systeembeheerder moet eerst op zijn eigen dashboard inloggen voordat hij bij uw gegevens kan.

                    Bewaartermijn persoonsgegevens: Uw gegevens worden alleen bewaard zolang u een account bij ons heeft. Verwijderd u uw account? Dan worden uw gegevens direct verwijderd uit ons systeem.

                    Doel van de opgeslagen gegevens: Wij verzamelen alleen de strikt noodzakelijke gegevens over u die nodig zijn om het proces zo goed mogelijk te laten draaien en u een goede service te kunnen bieden.

                    Wijziging van gegevens: Zit er een fout of is er een wijziging in de opgeslagen gegevens die wij van u verzamelen? Dan heeft u het recht om uw gegevens aan te passen, zodat deze gegevens wel kloppend zijn.
                </article>
            )}
        </div>
    )
}


//function allInformation {
//    return (
//        GeneralInformation,
//        CompanyInformation,
//        PersonInformation
//    )
//}

class Privacy extends React.Component {
    render() {
        return (
            GeneralInformation,
            CompanyInformation,
            PersonInformation
        );
    }
}

export default GeneralInformation;