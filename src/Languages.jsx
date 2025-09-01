
function Languages(){

    const languages = ["English", "German", "Swedish"];

    return(
        <div>
            <ul>
                {languages.map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <hr></hr>
        </div>
    );
}
export default Languages;