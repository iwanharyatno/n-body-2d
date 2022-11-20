import './style.css';
import './ui/Navbar';
import './ui/NBodySimulation';

document.querySelector('#app').innerHTML = 
`
<app-bar class="mb-3"></app-bar>
<main class="p-3">
  <n-body-simulation></n-body-simulation>
</main>
`;
