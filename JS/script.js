/* =====================================
   MELT-ROLL JAVASCRIPT
===================================== */

// KONFIGURASI
const NOMOR_WA = "6281262895243";
const HARGA_PRODUK = 10000;


// =====================================
// NAVBAR MOBILE
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", function () {
        navMenu.classList.remove("active");
    });
});


// =====================================
// FORMAT RUPIAH
// =====================================

function formatRupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}


// =====================================
// PILIH PRODUK
// =====================================

function pilihProduk(namaProduk) {

    const produk = document.getElementById("orderProduct");

    produk.value = namaProduk;

    document.getElementById("order").scrollIntoView({
        behavior: "smooth"
    });

    hitungTotal();
}


// =====================================
// HITUNG TOTAL HARGA
// =====================================

const jumlah = document.getElementById("quantity");
const total = document.getElementById("totalPrice");

function hitungTotal() {

    let banyak = parseInt(jumlah.value);

    if (isNaN(banyak) || banyak < 1) {
        banyak = 1;
    }

    jumlah.value = banyak;

    const totalHarga = banyak * HARGA_PRODUK;

    total.textContent = formatRupiah(totalHarga);
}

jumlah.addEventListener("input", hitungTotal);

document.getElementById("orderProduct")
    .addEventListener("change", hitungTotal);


// =====================================
// PESAN VIA WHATSAPP
// =====================================

const orderForm = document.getElementById("orderForm");

orderForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nama = document.getElementById("customerName").value.trim();
    const produk = document.getElementById("orderProduct").value;
    const banyak = parseInt(jumlah.value);
    const catatan = document.getElementById("note").value.trim();

    if (!nama || !produk || !Number.isInteger(banyak) || banyak < 1) {
        alert("Mohon lengkapi data pesanan terlebih dahulu!");
        return;
    }

    const totalHarga = banyak * HARGA_PRODUK;

    const pesan =
`Halo Melt-Roll! Saya ingin memesan.

Nama: ${nama}
Varian: ${produk}
Jumlah: ${banyak} pcs
Harga Satuan: ${formatRupiah(HARGA_PRODUK)}
Total: ${formatRupiah(totalHarga)}

Catatan: ${catatan || "-"}

Terima kasih!`;

    const linkWA = "https://wa.me/" + NOMOR_WA +
        "?text=" + encodeURIComponent(pesan);

    window.open(linkWA, "_blank");

});


// =====================================
// KOMENTAR PELANGGAN
// =====================================

const reviewForm = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");

function tampilkanReview(nama, komentar) {

    const empty = reviewList.querySelector(".empty-review");

    if (empty) {
        empty.remove();
    }

    const reviewItem = document.createElement("div");
    reviewItem.className = "review-item";

    const namaElement = document.createElement("strong");
    namaElement.textContent = nama;

    const label = document.createElement("small");
    label.textContent = "♡ Customer Melt-Roll";

    const komentarElement = document.createElement("p");
    komentarElement.textContent = komentar;

    reviewItem.appendChild(namaElement);
    reviewItem.appendChild(label);
    reviewItem.appendChild(komentarElement);

    reviewList.prepend(reviewItem);
}


// =====================================
// TAMBAH KOMENTAR
// =====================================

reviewForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nama = document.getElementById("reviewName").value.trim();
    const komentar = document.getElementById("reviewMessage").value.trim();

    if (!nama || !komentar) {
        alert("Mohon isi nama dan komentar!");
        return;
    }

    tampilkanReview(nama, komentar);

    reviewForm.reset();

    alert("Terima kasih sudah memberikan komentar!");

});


// =====================================
// INITIALIZATION
// =====================================

hitungTotal();