const Footer: React.FC = () => {


    return(
    <footer className="els-footer">
        <div className="container">
            <div className="mainRow row">
                <div className="col-12 col-lg-6">
                    <div className="text--light text-xs">
                        <span>&copy;</span> 2024 Els-Togo
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <ul className="footer-list">
                        <li className="text--light text-xs modal-open-btn"><a href="/legal">Mentions légales</a></li>
                        <li className="text--light text-xs modal-open-btn"><a href="/confidentiality">Politique de confidentialité</a></li>
                        <li className="text--light text-xs modal-open-btn"><a href="/credits">Crédits</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
    )

}