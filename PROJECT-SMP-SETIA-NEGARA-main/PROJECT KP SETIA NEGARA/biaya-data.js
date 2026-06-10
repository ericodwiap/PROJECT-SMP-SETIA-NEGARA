(function () {
    const COST_STORAGE_KEY = "smp-setia-negara-biaya";
    const REQUIREMENT_STORAGE_KEY = "smp-setia-negara-persyaratan";

    const defaultCosts = [
        { id: "biaya-pendaftaran", nama: "Biaya Pendaftaran", hargaLama: "", hargaUtama: "Rp 250.000", promo: "", catatan: "", highlight: false },
        { id: "uang-pangkal", nama: "Uang Pangkal", hargaLama: "Rp 3.000.000", hargaUtama: "Rp 1.800.000", promo: "Diskon", catatan: "", highlight: true },
        { id: "spp-bulan-promo", nama: "SPP / Bulan", hargaLama: "Rp 350.000", hargaUtama: "GRATIS", promo: "Gratis", catatan: "sampai Juli 2026", highlight: true },
        { id: "seragam", nama: "Seragam", hargaLama: "Rp 1.200.000", hargaUtama: "GRATIS", promo: "Gratis", catatan: "", highlight: false },
        { id: "spp-bulan", nama: "Biaya SPP/BULAN", hargaLama: "", hargaUtama: "Rp 350.000", promo: "", catatan: "", highlight: false }
    ];

    const defaultRequirements = [
        "Fotokopi Akta Kelahiran",
        "Fotokopi Kartu Keluarga (KK)",
        "Fotokopi Ijazah / Surat Keterangan Lulus",
        "Pas Foto 3x4 sebanyak 2 lembar",
        "Mengisi Formulir Pendaftaran",
        "Membayar Biaya Pendaftaran"
    ];

    function readCosts() {
        try {
            const saved = JSON.parse(localStorage.getItem(COST_STORAGE_KEY));
            return Array.isArray(saved) && saved.length ? saved : defaultCosts;
        } catch (error) {
            return defaultCosts;
        }
    }

    function readRequirements() {
        try {
            const saved = JSON.parse(localStorage.getItem(REQUIREMENT_STORAGE_KEY));
            return Array.isArray(saved) && saved.length ? saved : defaultRequirements;
        } catch (error) {
            return defaultRequirements;
        }
    }

    function getCosts() {
        return readCosts();
    }

    function getCost(id) {
        return readCosts().find((cost) => cost.id === id);
    }

    function updateCost(id, data) {
        const costs = readCosts().map((cost) => cost.id === id ? { ...cost, ...data, id } : cost);
        localStorage.setItem(COST_STORAGE_KEY, JSON.stringify(costs));
    }

    function getRequirements() {
        return readRequirements();
    }

    function setRequirements(requirements) {
        const cleaned = requirements.map((item) => String(item).trim()).filter(Boolean);
        localStorage.setItem(REQUIREMENT_STORAGE_KEY, JSON.stringify(cleaned));
    }

    function priceClass(cost) {
        if (/gratis/i.test(cost.hargaUtama || "")) return "harga-gratis";
        if (cost.hargaLama || cost.promo) return "harga-diskon";
        return "harga-normal";
    }

    function renderBiayaPage() {
        const wrapper = document.querySelector(".biaya-wrapper");
        const requirementList = document.querySelector(".persyaratan-box ul");

        if (wrapper) {
            wrapper.innerHTML = getCosts().map((cost) => `
                <div class="biaya-box${cost.highlight ? " highlight" : ""}">
                    <h3>${cost.nama || "-"}</h3>
                    ${cost.hargaLama ? `<p class="harga-lama">${cost.hargaLama}</p>` : ""}
                    <p class="${priceClass(cost)}">${cost.hargaUtama || "-"}</p>
                    ${cost.catatan ? `<small>${cost.catatan}</small>` : ""}
                </div>
            `).join("");
        }

        if (requirementList) {
            requirementList.innerHTML = getRequirements().map((requirement) => `<li>${requirement}</li>`).join("");
        }
    }

    window.BiayaData = {
        getCosts,
        getCost,
        updateCost,
        getRequirements,
        setRequirements,
        renderBiayaPage
    };
})();
