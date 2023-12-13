export default {
  /*html*/
  template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/guests">Guests</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/rooms">Rooms</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/bookings">Bookings</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/meals">Meals</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/mealorders">Meal Orders</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav> 
    <router-view></router-view>
    `
}