import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom'


import Login from './components/Login'
import User from './components/User'
import Contents from './components/Contents'
import ContentDetails from './components/ContentDetails'
import RecipeDetails from './components/RecipeDetails'
import NewRecipe from './components/NewRecipe'

// const apiURL = process.env.REACT_APP_BACKEND_APP_URL || 'http://localhost:8080/api'
const apiURL = 'https://taste-e-recipe-api.herokuapp.com/api' || 'http://localhost:8080/api'

export default withRouter(class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipes: [],
      contents: [],
      users: [],
      user_id: ''
    }
  }

  getRecipes = () => {
    axios
      .get(`${apiURL}/recipes`)
      .then(res => {
        this.setState(
          {
            recipes: res.data
          }
        )
      })
  }

  postRecipe = (e) => {
    e.preventDefault()
    axios({
      method: "POST",
      url: `${apiURL}/recipes`,
      data: {
        name: this.state.newRecipeName,
        mainProtein: this.state.newMainProtein,
        submittedBy: this.state.currentUser
      }
    })
    .then(newRecipe => {
      this.setState(prevState => (
        {
          recipes: [...prevState.recipes, newRecipe.data]
        }
      ))
      this.props.history.push(`/contents/${newRecipe.data.mainProtein}/${newRecipe.data._id}`);
    })
  }

  putRecipe = (e) => {
    e.preventDefault()
    let proteinId = e.target.getAttribute('data-protein-id')
    let recipeId = e.target.id
    axios({
      method: "PUT",
      url: `${apiURL}/recipes/${e.target.id}`,
      data: {
        name: this.state.newRecipeName,
        directions: this.state.newDirections,
        ingredients: this.state.newIngredients
      }
    })
    .then(res => {
      this.setState(
        {
          recipes: res.data
        }
      )
      this.props.history.push(`/contents/${proteinId}/${recipeId}`)
    });
  }

  deleteRecipe = (e) => {
    e.preventDefault()
    axios
      .delete(`${apiURL}/recipes/${e.target.id}`)
      .then(res => {
        this.props.history.push('/contents')
        this.setState(
          {
            recipes: res.data
          }
        )
      })
  }

  getContents = () => {
    axios
      .get(`${apiURL}/contents`)
      .then(res => {
        this.setState(
          {
            contents: res.data
          }
        )
      })
  }

  getContent = () => {
    axios
      .get(`${apiURL}/contents/:id`)
      .then(res => {
        this.setState(
          {
            contents: res.data
          }
        )
      })
  }

  getUsers = () => {
    axios
      .get(`${apiURL}/users`)
      .then(res => {
        this.setState(
          {
            currentUser: res.data
          }
        )
      })
  }

  getUser = (e) => {
    e.preventDefault()
    axios
      .get(`${apiURL}/users/${e.target.id}`)
      .then(res => {
        this.props.history.push('/')
        this.setState(
          {
            currentUser: res.data
          }
        )
      })
      .catch(error => console.log('error', error))
  }

  responseGoogle = (response) => {
    axios({
      method: 'post',
      url: `${apiURL}/users`,
      data: {
        email: response.profileObj.email
      }
    })
    .then(res => {
      console.log(res)
      this.setState({
        users: res.data,
        user_id: res.data[0]._id,
        currentUser: res.data[0].email
      })
      this.props.history.push(`/user/${this.state.user_id}`)
    })
  }
   
  postUser = (e) => {
    e.preventDefault()
    axios({
      method: 'post',
      url: `${apiURL}/users`,
      data: {
        email: this.state.currentUser
      }
    })
      .then(res => {
        this.setState({
          users: res.data,
          user_id: res.data[res.data.findIndex(user => {
            return user.email === this.state.currentUser
          })]._id
        })
        this.props.history.push(`/user/${this.state.user_id}`)
      })
  }

  putUser = (e) => {
    e.preventDefault()
    if (this.state.newFirstName) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { firstName: this.state.newFirstName }
      })
        .then(res => {
          this.setState(
            {
              users: res.data,
              newFirstName: ''
            }
          )
        })
    } if (this.state.newLastName) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { lastName: this.state.newLastName }
      })
        .then(res => {
          this.setState(
            {
              users: res.data,
              newLastName: ''
            }
          )
        })
    } if (this.state.newEmail) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { email: this.state.newEmail }
      })
        .then(res => {
          this.setState(
            {
              users: res.data,
              newEmail: ''
            }
          )
        })
    }
  }

  deleteUser = (e) => {
    e.preventDefault()
    axios
      .delete(`${apiURL}/users/${e.target.id}`)
      .then(res => {
        this.props.history.push('/')
        this.setState(
          {
            users: res.data,
            currentUser: ''
          }
        )
      })
  }
  
  handleFormChange = (e) => {
    e.preventDefault()
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  componentDidMount() {
    this.getRecipes()
    this.getContents()
  }
  
  render() {  
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Link to="/contents">
              Table of Contents
            </Link>
          </div>
          <div>
            <Link to={`/user/${this.state.user_id}`}>
              Welcome {this.state.currentUser}
            </Link>
          </div>
          <div>
            <Link to='/'>
              LogOut
            </Link>
          </div>
        </header>
        <main>
          <Switch>
            <Route exact path='/'
              render={
                () => <Login
                  users={this.state.users}
                  handleSubmit={this.postUser}
                  handleFormChange={this.handleFormChange}
                  responseGoogle={this.responseGoogle}
                />
              }
            />
            <Route path='/user/:id'
              render={
                routerProps => <User
                  {...routerProps}
                  users={this.state.users}
                  handlePutUser={this.putUser}
                  handleFormChange={this.handleFormChange}
                  handleDelete={this.deleteUser}
                />
              }
            /><Route exact path='/contents'
              render={
                () => <Contents
                  contents={this.state.contents}
                />
              }
            />
            <Route exact path='/contents/:id'
              render={
                routerProps => <ContentDetails
                  {...routerProps}
                  contents={this.state.contents}
                  recipes={this.state.recipes}
                />
              }
            />
            <Route exact path='/contents/:id/:recipeId'
              render={
                routerProps => <RecipeDetails
                  {...routerProps}
                  handleDelete={this.deleteRecipe}
                  recipes={this.state.recipes}
                  currentUser={this.state.currentUser}
                  handleUpdateRecipe={this.putRecipe}
                  handleFormChange={this.handleFormChange}
                  contents={this.state.contents}
                />
              }
            />
            <Route exact path='/recipe/new'
              render={
                () => <NewRecipe
                  handleFormChange={this.handleFormChange}
                  handleNewRecipe={this.postRecipe}
                />
              }
            />
            <Route path='*'
              render={
                () => <Redirect to='/' />
              }
            />
          </Switch>
        </main>
      </div>
    )
  }
})