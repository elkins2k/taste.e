import React, { Component } from 'react'
import axios from 'axios'
import { withRouter, Link, Switch, Route, Redirect } from 'react-router-dom'

import Login from './components/Login'
import User from './components/User'
import Contents from './components/Contents'
import ContentDetails from './components/ContentDetails'
import RecipeDetails from './components/RecipeDetails'
import NewRecipe from './components/NewRecipe'
import Logout from './components/Logout'

const corsProxy = 'https://cors-anywhere.herokuapp.com/'
const apiURL = process.env.REACT_APP_BACKEND_APP_URL || 'http://localhost:8080/api' || corsProxy + 'https://taste-e-recipe-api.herokuapp.com/api' 

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
      return null
      })
  }

  postRecipe = (e) => {
    e.preventDefault()
    axios({
      method: "POST",
      url: `${apiURL}/recipes`,
      data: {
        name: this.state.newRecipeName,
        heading: this.state.newHeading,
        submittedBy: this.state.currentUser
      }
    })
    .then(newRecipe => {
      this.setState(prevState => (
          {
            recipes: [...prevState.recipes, newRecipe.data],
          }
        ))
      this.props.history.push(`/contents/${newRecipe.data.heading._id}/${newRecipe.data._id}`)
      })
  }

  putRecipe = (e) => {
    e.preventDefault()
    let headingId = e.target.getAttribute('data-heading-id')
    let recipeId = e.target.id
    axios({
      method: "PUT",
      url: `${apiURL}/recipes/${e.target.id}`,
      data: {
        name: this.state.newRecipeName,
        directions: this.state.newDirections,
        heading:headingId
      }
    })
    .then(res => {
      this.setState(
        {
          recipes: res.data
        }
      )
      this.props.history.push(`/contents/${headingId}/${recipeId}`)
    });
  }

  handleNewIngredient = (e) => {
    e.preventDefault()
    let headingId = e.target.getAttribute('data-heading-id')
    let recipeId = e.target.id
    axios ({
      method: "POST",
      url: `${apiURL}/recipes/${e.target.id}/new-ingredient/`,
      data: {
        ingredient: this.state.newIngredient
      }
    })
    .then ( () => {
      this.setState (
        {
          newIngredient: ''
        }
      )
      this.getRecipes();
      this.props.history.push(`/contents/${headingId}/${recipeId}`);
    });
  };

  deleteRecipe = (e) => {
    e.preventDefault()
    // let headingId = e.target.getAttribute('data-heading-id')
    axios
      .delete(`${apiURL}/recipes/${e.target.id}`)
      .then(res => {
        this.setState(
          {
            recipes: res.data
          }
        )
        this.props.history.push(`/contents`)
      })
  }

  deleteIngredient = (e) => {
    console.log('deleteIngredient', e.target)
    // e.preventDefault();
    let headingId = e.target.getAttribute('data-heading-id')
    let recipeId = e.target.getAttribute('recipe-id')
    let ingredientId = e.target.getAttribute('data-ingredient-id')
    console.log (headingId, ingredientId, headingId)
    axios
      .delete(`${apiURL}/recipes/${recipeId}/delete-ingredient/${ingredientId}`)
      .then ( res => {
        this.setState(
          {
            recipes: res.data
          }
        )
        this.props.history.push(`/contents/${headingId}/${recipeId}`);
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
    } if (this.state.newCarbs) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { avoidCarbs: this.state.newCarbs }
      })
      .then(res => {
        this.setState(
          {
            users: res.data,
            newCarbs: ''
          }
        )
      })
    } if (this.state.newDairy) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { avoidDairy: this.state.newDairy }
      })
      .then(res => {
        this.setState(
          {
            users: res.data,
            newDairy: ''
          }
        )
      })
    } if (this.state.newEggs) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { avoidEggs: this.state.newEggs }
      })
      .then(res => {
        this.setState(
          {
            users: res.data,
            newEggs: ''
          }
        )
      })
    } if (this.state.newGluten) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { avoidGluten: this.state.newGluten }
      })
      .then(res => {
        this.setState(
          {
            users: res.data,
            newGluten: ''
          }
        )
      })
    } if (this.state.newMeat) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { avoidMeat: this.state.newMeat }
      })
      .then(res => {
        this.setState(
          {
            users: res.data,
            newMeat: ''
          }
        )
      })
    } if (this.state.newNuts) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { avoidNuts: this.state.newNuts }
      })
      .then(res => {
        this.setState(
          {
            users: res.data,
            newNuts: ''
          }
        )
      })
    } if (this.state.newQuinoa) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { avoidQuinoa: this.state.newQuinoa }
      })
      .then(res => {
        this.setState(
          {
            users: res.data,
            newQuinoa: ''
          }
        )
      })
    } if (this.state.newShellfish) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { avoidShellfish: this.state.newShellfish }
      })
      .then(res => {
        this.setState(
          {
            users: res.data,
            newShellfish: ''
          }
        )
      })
    } if (this.state.newSpicy) {
      axios({
        method: 'put',
        url: `${apiURL}/users/${e.target.id}`,
        data: { avoidSpicy: this.state.newSpicy }
      })
      .then(res => {
        this.setState(
          {
            users: res.data,
            newSpicy: ''
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
    console.log(e.target)
    this.setState(
      {
        [e.target.name]: e.target.value
      }
    )
  }

  handleLogout = () => {
    if (this.state.currentUser !== '') {
      this.setState(
        {
          currentUser:''
        }
      )
    }
    this.props.history.push('/')
  }

  componentDidMount() {
    this.getContents()
    this.getRecipes()
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
            <Link to='/logout'>
              LogOut
            </Link>
          </div>
        </header>
        <main>
          <Switch>
            <Route exact path='/logout'
              render={
                () => <Logout
                  handleLogout={this.handleLogout}
                />
              }
            />
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
                  handleDeleteRecipe={this.deleteRecipe}
                  recipes={this.state.recipes}
                  newContents={this.state.newContents}
                  currentUser={this.state.currentUser}
                  handlePutRecipe={this.putRecipe}
                  handleFormChange={this.handleFormChange}
                  contents={this.state.contents}
                  handleNewIngredient={this.handleNewIngredient}
                  newIngredientDescription={this.state.newIngredientDescription}
                  deleteIngredient={this.deleteIngredient}
                />
              }
            />
            <Route exact path='/recipe/new'
              render={
                () => <NewRecipe
                  handleFormChange={this.handleFormChange}
                  handlePostRecipe={this.postRecipe}
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