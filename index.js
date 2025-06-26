const vehicles = [
  // Lamborghini
  {
    marca: "Lamborghini",
    modelo: "Urus",
    tipo: "SUV",
    preco: "R$ 8.310.000",
    imagem: "img/Lamborghini3.png",
  },
  {
    marca: "Lamborghini",
    modelo: "Revuelto",
    tipo: "Supercarro",
    preco: "R$ 7.941.790",
    imagem: "img/lambo.png",
  },
  {
    marca: "Lamborghini",
    modelo: "Huracán Sterrato",
    tipo: "Supercarro",
    preco: "R$ 17.778.335",
    imagem: "img/lamborghini-sterrato.png",
  },
  {
    marca: "Lamborghini",
    modelo: "Aventador SV Roadster",
    tipo: "Supercarro",
    preco: "R$ 9.650.375",
    imagem: "img/lamborghini-aventador.png",
  },
  {
    marca: "Lamborghini",
    modelo: "Veneno Coupé",
    tipo: "Supercarro",
    preco: "R$ 14.720.060",
    imagem: "img/lambovene.png",
  },

  // Aston Martin
  {
    marca: "Aston Martin",
    modelo: "Valkyrie",
    tipo: "Grand Tourer",
    preco: "R$ 37.584.207",
    imagem: "img/aston-martin-vantage.png",
  },
  {
    marca: "Aston Martin",
    modelo: "Vantage",
    tipo: "Grand Tourer",
    preco: "R$ 22.371.090",
    imagem: "img/astonmartinvalkyrie.png",
  },

  // Ferrari
  {
    marca: "Ferrari",
    modelo: "12Cilindri",
    tipo: "Supercarro",
    preco: "R$ 7.329.752",
    imagem: "img/Ferrari 12Cilindri.png",
  },
  {
    marca: "Ferrari",
    modelo: "296 GTB",
    tipo: "Supercarro",
    preco: "R$ 6.500.000",
    imagem: "img/Ferrari296GTB.png",
  },
  {
    marca: "Ferrari",
    modelo: "LaFerrari",
    tipo: "Supercarro",
    preco: "R$ 38.093.218",
    imagem: "img/FerrariLaFerrari.png",
  },
  {
    marca: "Ferrari",
    modelo: "Spider",
    tipo: "Supercarro",
    preco: "R$ 6.729.610",
    imagem: "img/FerrariSpider.png",
  },
  {
    marca: "Ferrari",
    modelo: "Stradale",
    tipo: "Supercarro",
    preco: "R$ 6.320.780",
    imagem: "img/FerrariStradale.png",
  },

  // Bugatti
  {
    marca: "Bugatti",
    modelo: "Chiron",
    tipo: "Hypercar",
    preco: "R$ 28.500.000",
    imagem: "img/BugattiChiron.png",
  },
  {
    marca: "Bugatti",
    modelo: "Chiron Super Sport",
    tipo: "Hypercar",
    preco: "R$ 50.509.000",
    imagem: "img/BugattiChironSuperSport.png",
  },
  {
    marca: "Bugatti",
    modelo: "La Voiture Noire",
    tipo: "Hypercar",
    preco: "R$ 92.000.000",
    imagem: "img/BugattiLaVoitureNoire.png",
  },
  {
    marca: "Bugatti",
    modelo: "Chiron Pur Sport",
    tipo: "Hypercar",
    preco: "R$ 40.500.000",
    imagem: "img/bugatti-chiron-pur-sport.png",
  },

  // Pagani
  {
    marca: "Pagani",
    modelo: "Huayra R",
    tipo: "Hypercar",
    preco: "R$ 50.000.000",
    imagem: "img/PaganiHuayraR.png",
  },
  {
    marca: "Pagani",
    modelo: "Zonda HP Barchetta",
    tipo: "Hypercar",
    preco: "R$ 75.000.000",
    imagem: "img/PaganiZondaHPBarchetta.png",
  },
  {
    marca: "Pagani",
    modelo: "Utopia",
    tipo: "Hypercar",
    preco: "R$ 30.000.000",
    imagem: "img/pagani_utopia.png",
  },

  // BMW
  {
    marca: "BMW",
    modelo: "M5 Competition",
    tipo: "Sedan",
    preco: "R$ 875.000",
    imagem: "img/BMWM5Competition.png",
  },
  {
    marca: "BMW",
    modelo: "X6 M",
    tipo: "SUV",
    preco: "R$ 980.000",
    imagem: "img/BMWX6M.png",
  },
  {
    marca: "BMW",
    modelo: "M4 Coupe",
    tipo: "Coupe",
    preco: "R$ 850.000",
    imagem: "img/BMWM4Coupe.png",
  },
  {
    marca: "BMW",
    modelo: "M135i xDrive",
    tipo: "Hatch",
    preco: "R$ 390.000",
    imagem: "img/BMWM135ixDrive.png",
  },
  {
    marca: "BMW",
    modelo: "Z4 Roadster",
    tipo: "Convertible",
    preco: "R$ 420.000",
    imagem: "img/BMWZ4Roadster.png",
  },
];

// Seletores DOM
const list = document.getElementById("vehicleList");
const modal = document.getElementById("testDriveModal");
const closeBtn = document.querySelector(".close");
const form = document.getElementById("scheduleForm");
const agendamentosList = document.getElementById("agendamentosList");

let veiculoSelecionado = null;

// Formata data para dd/mm/aaaa
function formatarData(dataISO) {
  const date = new Date(dataISO);
  if (isNaN(date)) return dataISO;
  return date.toLocaleDateString("pt-BR");
}

// Salvar agendamento no localStorage
function salvarAgendamento(dados) {
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
  agendamentos.push(dados);
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  mostrarAgendamentos();
}

// Mostrar agendamentos na lista
function mostrarAgendamentos() {
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
  agendamentosList.innerHTML = "";

  if (agendamentos.length === 0) {
    agendamentosList.innerHTML = "<p>Nenhum agendamento ainda.</p>";
    return;
  }

  agendamentos.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "agendamento-item";
    div.innerHTML = `
      <p><strong>${item.nome}</strong> - ${formatarData(item.data)} às ${
      item.horario
    }</p>
      <button type="button">Cancelar</button>
    `;
    const btn = div.querySelector("button");
    btn.addEventListener("click", () => cancelarAgendamento(index));
    agendamentosList.appendChild(div);
  });
}

// Cancelar agendamento pelo índice
function cancelarAgendamento(index) {
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || [];
  agendamentos.splice(index, 1);
  localStorage.setItem("agendamentos", JSON.stringify(agendamentos));
  mostrarAgendamentos();
}

// Renderizar lista de veículos (recebe array com índice original)
function renderList(veiculos) {
  list.innerHTML = "";
  veiculos.forEach((car, idx) => {
    const card = document.createElement("div");
    card.className = "card";
    if (idx % 2 !== 0) card.classList.add("reversed");
    card.innerHTML = `
      <img class="card-img" src="${car.imagem || "img/placeholder.jpg"}" alt="${
      car.modelo || "Imagem do veículo"
    }" />
      <div class="card-content">
        <h3>${car.marca} ${car.modelo || "Modelo não informado"}</h3>
        <p>Tipo: ${car.tipo}</p>
        <p>Preço: ${car.preco || "Sob consulta"}</p>
        <button type="button">Agendar Test Drive</button>
      </div>
    `;
    const btn = card.querySelector("button");
    btn.addEventListener("click", () => openModal(car.originalIndex));
    list.appendChild(card);
  });
}

// Renderizar todos os veículos (sem filtro)
function renderVehicles() {
  // Anexa índice original para cada veículo
  const vehiclesWithIndex = vehicles.map((v, i) => ({
    ...v,
    originalIndex: i,
  }));
  renderList(vehiclesWithIndex);
}

// Abrir modal e mostrar veículo selecionado
function openModal(index) {
  veiculoSelecionado = vehicles[index];
  modal.style.display = "flex";

  const tituloModal = modal.querySelector("h2");
  tituloModal.textContent = `Agendar Test Drive - ${veiculoSelecionado.marca} ${veiculoSelecionado.modelo}`;
}

// Fechar modal
function closeModal() {
  modal.style.display = "none";
}

// Fechar modal ao clicar no botão X
closeBtn.addEventListener("click", closeModal);

// Fechar modal clicando fora do conteúdo
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Fechar modal com ESC
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});

// Enviar formulário de agendamento
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const dados = {
    nome: form.name.value.trim(),
    email: form.email.value.trim(),
    data: form.date.value,
    horario: form.time.value,
    local: form.location.value,
  };

  salvarAgendamento(dados);

  alert("Test Drive agendado com sucesso na Concessionária MAX-FIVE!");
  form.reset();
  closeModal();
  form.name.focus();
});

// Filtrar veículos conforme busca e filtro de tipo
function filter() {
  const text = document.getElementById("search").value.toLowerCase();
  const type = document.getElementById("typeFilter").value;

  const filtered = vehicles
    .map((v, i) => ({ ...v, originalIndex: i }))
    .filter(
      (v) =>
        (v.modelo.toLowerCase().includes(text) ||
          v.marca.toLowerCase().includes(text)) &&
        (type === "" || v.tipo === type)
    );

  renderList(filtered);
}

// Eventos dos filtros
document.getElementById("search").addEventListener("input", filter);
document.getElementById("typeFilter").addEventListener("change", filter);

// Inicializar
renderVehicles();
mostrarAgendamentos();

// Tornar funções globais se precisar chamar no HTML (ex: no onclick inline)
window.openModal = openModal;
window.cancelarAgendamento = cancelarAgendamento;
