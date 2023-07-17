// <% for (let i = 0; i < etapas.length; i++) { %>
//     <% const etapa = etapas[i]; %>
//     <li class="nav-item" role="presentation">
//       <button class="nav-link <%= i === 0 ? 'active btn-desativar' : 'btn-ativar' %>"
//         id="<%= etapa.Nome.toLowerCase().replace(' ', '-') %>-tab"
//         data-bs-toggle="tab" data-bs-target="#<%= etapa.Nome.toLowerCase().replace(' ', '-') %>-tab-pane"
//         type="button" role="tab" aria-controls="<%= etapa.Nome.toLowerCase().replace(' ', '-') %>-tab-pane"
//         aria-selected="<%= i === 0 %>">
//         <%= etapa.Nome %>
//       </button>
//     </li>
//   <% } %>