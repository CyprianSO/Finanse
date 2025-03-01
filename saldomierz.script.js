const saldoDisplay = document.getElementById('saldo');
const dodajButton = document.getElementById('dodaj');
const odejmijButton = document.getElementById('odejmij');
const historiaButton = document.getElementById('historia');
const listaHistorii = document.getElementById('lista-historii'); // Tabela historii
const saldoInputContainer = document.getElementById('saldo-input-container');
const noweSaldoInput = document.getElementById('nowe-saldo');
const zatwierdzSaldoButton = document.getElementById('zatwierdz-saldo');
const zamknijSaldoInput = document.querySelector('.zamknij-saldo-input');
const edytujSaldoButton = document.getElementById('edytuj-saldo');
const inputContainerDodaj = document.getElementById('input-container-dodaj');
const kwotaDodajInput = document.getElementById('kwota-dodaj');
const opisDodajInput = document.getElementById('opis-dodaj');
const zatwierdzDodajButton = document.getElementById('zatwierdz-dodaj');
const zamknijDodaj = document.querySelector('.zamknij-dodaj');
const inputContainerOdejmij = document.getElementById('input-container-odejmij');
const kwotaOdejmijInput = document.getElementById('kwota-odejmij');
const opisOdejmijInput = document.getElementById('opis-odejmij');
const zatwierdzOdejmijButton = document.getElementById('zatwierdz-odejmij');
const zamknijOdejmij = document.querySelector('.zamknij-odejmij');

let saldo = parseFloat(localStorage.getItem('saldo')) || 0;
let historia = JSON.parse(localStorage.getItem('historia')) || [];

function aktualizujSaldo() {
    saldoDisplay.textContent = `${saldo} zł`;
    localStorage.setItem('saldo', saldo.toString());
}

function wyswietlHistorie() {
    listaHistorii.innerHTML = '';
    historia.forEach(transakcja => {
        const row = listaHistorii.insertRow();
        const cellData = row.insertCell(0);
        const cellOpis = row.insertCell(1);
        const cellKwota = row.insertCell(2);
        const cellSaldoPoOperacji = row.insertCell(3);

        cellData.textContent = transakcja.data;
        cellOpis.textContent = transakcja.opis;
        cellKwota.textContent = transakcja.kwota;
        cellSaldoPoOperacji.textContent = transakcja.saldoPoOperacji;
    });
}

aktualizujSaldo();
wyswietlHistorie();

edytujSaldoButton.addEventListener('click', () => {
    saldoInputContainer.style.display = 'block';
});

dodajButton.addEventListener('click', () => {
    inputContainerDodaj.style.display = 'block';
    saldoInputContainer.style.display = 'none';
    inputContainerOdejmij.style.display = 'none';
});

odejmijButton.addEventListener('click', () => {
    inputContainerOdejmij.style.display = 'block';
    saldoInputContainer.style.display = 'none';
    inputContainerDodaj.style.display = 'none';
});

historiaButton.addEventListener('click', () => {
    wyswietlHistorie();
});

zatwierdzSaldoButton.addEventListener('click', () => {
    const noweSaldo = parseFloat(noweSaldoInput.value);
    if (!isNaN(noweSaldo)) {
        saldo = noweSaldo;
        aktualizujSaldo();
        saldoInputContainer.style.display = 'none';
    } else {
        alert('Wprowadź poprawne saldo.');
    }
});

zatwierdzDodajButton.addEventListener('click', () => {
    const kwota = parseFloat(kwotaDodajInput.value);
    const opis = opisDodajInput.value || 'Brak opisu';
    if (!isNaN(kwota)) {
        saldo += kwota;
        const transakcja = {
            data: new Date().toLocaleString(),
            kwota: `+${kwota} zł`,
            opis: opis,
            saldoPoOperacji: `${saldo} zł`
        };
        historia.push(transakcja);
        localStorage.setItem('historia', JSON.stringify(historia));
        aktualizujSaldo();
        wyswietlHistorie();
        inputContainerDodaj.style.display = 'none';
    } else {
        alert('Wprowadź poprawną kwotę.');
    }
});

zatwierdzOdejmijButton.addEventListener('click', () => {
    const kwota = parseFloat(kwotaOdejmijInput.value);
    const opis = opisOdejmijInput.value || 'Brak opisu';
    if (!isNaN(kwota)) {
        saldo -= kwota;
        const transakcja = {
            data: new Date().toLocaleString(),
            kwota: `-${kwota} zł`,
            opis: opis,
            saldoPoOperacji: `${saldo} zł`
        };
        historia.push(transakcja);
        localStorage.setItem('historia', JSON.stringify(historia));
        aktualizujSaldo();
        wyswietlHistorie();
        inputContainerOdejmij.style.display = 'none';
    } else {
        alert('Wprowadź poprawną kwotę.');
    }
});

if (zamknijSaldoInput) {
    zamknijSaldoInput.addEventListener('click', () => {
        saldoInputContainer.style.display = 'none';
    });
}

if (zamknijDodaj) {
    zamknijDodaj.addEventListener('click', () => {
        inputContainerDodaj.style.display = 'none';
    });
}

if (zamknijOdejmij) {
    zamknijOdejmij.addEventListener('click', () => {
        inputContainerOdejmij.style.display = 'none';
    });
}