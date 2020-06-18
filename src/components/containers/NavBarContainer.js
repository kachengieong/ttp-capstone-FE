import React, { Component } from "react";
import { searchAnimeThunk } from "../../thunks";
import NavBarView from "../views/NavBarView.js";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchResultsContainer from "../containers/SearchResultsContainer";

class NavBarContainer extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
      returnResults: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.searchAnime(this.state.keyword);
  }
  handleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
    console.log(this.state.keyword);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.keyword);
    this.props.searchAnime(this.state.keyword);
    this.setState({ returnResults: true });
  };

  render() {
    console.log("props.results => ", this.props.results);
    if (this.state.returnResults === true) {
      return <Redirect to={`/results/${this.state.keyword}`} />;
    }

    return (
      <NavBarView
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapState = (state) => {
  console.log("from the navbar Container for search====>", state.search.data);
  return {
    results: state.search.data,
  };
};

const mapDispatch = (dispatch) => {
  return {
    searchAnime: (searchTerm) => dispatch(searchAnimeThunk(searchTerm)),
  };
};

export default connect(mapState, mapDispatch)(NavBarContainer);