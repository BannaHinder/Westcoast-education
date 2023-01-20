import { useParams } from "react-router-dom";


function NoMatch() {

    const url = useParams()
console.log(url)
    return (    
        <section>
            <h2>Page not found</h2>
            <p>{url['*']}</p>
        </section>

         );
}

export default NoMatch;