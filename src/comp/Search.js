import React from "react";

const styles = {
    search: {
        textAlign: "center",
        padding: "1rem",
        
    },
    input: {
        padding: "0.7rem 1.5rem",
        fontSize: "1.2rem",
        borderRadius: "25px",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        background: "rgba(255, 255, 255, 0.1)",
        color: "white"
    },
    
}


class Search extends React.Component {
    state = { term: "" }
    render() {
        const onSearchSubmit = (event) => {
            event.preventDefault();
            if (this.state.term === "borovskoy") {
                alert("Did you mean Borovoy?");
            }
            this.props.onSubmit(this.state.term);
            console.log(this.state.term);
        }
        return (
            <div style={styles.search} className="search">
                <form onSubmit={onSearchSubmit} className="form">
                    <input id="inp" style={styles.input } value={this.state.term} onChange={e => this.setState({ term: e.target.value })} type="text" placeholder="search city" />
                </form>
            </div>
        )
    }
}

export default Search;