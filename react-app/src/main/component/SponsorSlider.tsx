import "../styles/SponsorSlider.css";
function SponsorSlider() {

    const sponsors = ["Celo","Rootstock","Safe","boubou","boubou","boubou","boubou","boubou","boubou","boubou","boubou"]

    return (
        <div className={"SponsorSlider"}>
            <h2>SponsorSlider</h2>
            <div >
                {sponsors.map((sponsor, index) => (
                    <img key={index} src={"https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k"}/>
                ))}
            </div>
        </div>
    );
}

export default SponsorSlider;