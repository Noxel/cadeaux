import React, { Component } from 'react';
import '../assets/css/Home.css';
import gift from '../assets/img/gift.png';

class Home extends Component {
    render() {
        return (
            <>
                <h1>Cadeaux</h1>

                <img src={gift} alt="logo" className="logo"/>

                <div className="texte">
                    <p>
                        L'application cadeaux vous aide à ne pas oublier les cadeaux que vous avez à faire pour vos
                        proches !
                        Vous pourrez ainsi vous organiser simplement afin de gérer votre budget pour les anniversaires
                        de vos proches et pour les fêtes de fins d'années.
                    </p>

                    <p>
                        Pour commencer, enregistrer vos contacts afin de renseigner leurs informations personnelles et
                        surtout leur date de naissance.
                    </p>

                    <p>Ces dates seront liées aux cadeaux que vous inscrirez dans l'application.</p>

                    <p>
                        Afin d'avoir un aperçu global des cadeaux que vous devez acheter, vous pouvez vous rendre dans
                        l'onglet "Calendrier". Vous y retrouverez les différents cadeaux à faire, avec le nom de la
                        personne à qui il sera offert et son prix.
                    </p>
                </div>
            </>
        );
    }
}

export default Home;
