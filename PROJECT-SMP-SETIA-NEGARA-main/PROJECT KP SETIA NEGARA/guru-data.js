(function () {
    const STORAGE_KEY = "smp-setia-negara-guru";
    const DEFAULT_PHOTO = "asset/image/ICON.jpg";

    const defaultTeachers = [
        {
            id: "guru-1",
            nama: "Nama Guru 1",
            nip: "1987654321",
            mapel: "Matematika",
            jenisKelamin: "Laki-laki",
            pendidikan: "S1 Pendidikan Matematika",
            status: "Aktif",
            jabatan: "Wali Kelas VIII-A & Guru Mapel",
            tugas: "Pembina OSIS",
            mulai: "2012",
            email: "namaguru@smpsetianegara.sch.id",
            instagram: "@namaguru.official",
            facebook: "Nama Guru Official",
            tiktok: "@namaguru.id",
            deskripsi: "Beliau merupakan guru yang berpengalaman, disiplin, dan berdedikasi tinggi dalam mendidik siswa. Selain mengajar, beliau juga aktif membina kegiatan sekolah serta membimbing siswa dalam bidang akademik maupun karakter.",
            foto: DEFAULT_PHOTO
        },
        {
            id: "guru-2",
            nama: "Nama Guru 2",
            nip: "1987654322",
            mapel: "Bahasa Indonesia",
            jenisKelamin: "Perempuan",
            pendidikan: "S1 Pendidikan Bahasa Indonesia",
            status: "Aktif",
            jabatan: "Guru Mapel",
            tugas: "Pembina Literasi",
            mulai: "2014",
            email: "guru2@smpsetianegara.sch.id",
            instagram: "@guru2.official",
            facebook: "Nama Guru 2 Official",
            tiktok: "@guru2.id",
            deskripsi: "Guru yang aktif mengembangkan kemampuan literasi siswa melalui pembelajaran bahasa yang komunikatif dan menyenangkan.",
            foto: DEFAULT_PHOTO
        },
        {
            id: "guru-3",
            nama: "Nama Guru 3",
            nip: "1987654323",
            mapel: "IPA",
            jenisKelamin: "Laki-laki",
            pendidikan: "S1 Pendidikan IPA",
            status: "Aktif",
            jabatan: "Guru Mapel",
            tugas: "Pembina Karya Ilmiah",
            mulai: "2015",
            email: "guru3@smpsetianegara.sch.id",
            instagram: "@guru3.official",
            facebook: "Nama Guru 3 Official",
            tiktok: "@guru3.id",
            deskripsi: "Berpengalaman membimbing siswa memahami sains melalui praktik, observasi, dan kegiatan eksperimen sederhana.",
            foto: DEFAULT_PHOTO
        },
        {
            id: "guru-4",
            nama: "Nama Guru 4",
            nip: "1987654324",
            mapel: "IPS",
            jenisKelamin: "Perempuan",
            pendidikan: "S1 Pendidikan IPS",
            status: "Aktif",
            jabatan: "Guru Mapel",
            tugas: "Pembina Kedisiplinan",
            mulai: "2016",
            email: "guru4@smpsetianegara.sch.id",
            instagram: "@guru4.official",
            facebook: "Nama Guru 4 Official",
            tiktok: "@guru4.id",
            deskripsi: "Membantu siswa memahami lingkungan sosial, sejarah, dan nilai kebangsaan melalui pembelajaran kontekstual.",
            foto: DEFAULT_PHOTO
        },
        {
            id: "guru-5",
            nama: "Nama Guru 5",
            nip: "1987654325",
            mapel: "Bahasa Inggris",
            jenisKelamin: "Laki-laki",
            pendidikan: "S1 Pendidikan Bahasa Inggris",
            status: "Aktif",
            jabatan: "Guru Mapel",
            tugas: "Pembina English Club",
            mulai: "2017",
            email: "guru5@smpsetianegara.sch.id",
            instagram: "@guru5.official",
            facebook: "Nama Guru 5 Official",
            tiktok: "@guru5.id",
            deskripsi: "Mengajar Bahasa Inggris dengan pendekatan praktik komunikasi agar siswa percaya diri berbicara dan menulis.",
            foto: DEFAULT_PHOTO
        },
        {
            id: "guru-6",
            nama: "Nama Guru 6",
            nip: "1987654326",
            mapel: "PKN",
            jenisKelamin: "Perempuan",
            pendidikan: "S1 Pendidikan PKN",
            status: "Aktif",
            jabatan: "Guru Mapel",
            tugas: "Pembina Upacara",
            mulai: "2018",
            email: "guru6@smpsetianegara.sch.id",
            instagram: "@guru6.official",
            facebook: "Nama Guru 6 Official",
            tiktok: "@guru6.id",
            deskripsi: "Membina pemahaman siswa tentang karakter, hak dan kewajiban, serta nilai-nilai kewarganegaraan.",
            foto: DEFAULT_PHOTO
        }
    ];

    function safeRead() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(saved) && saved.length ? saved : defaultTeachers;
        } catch (error) {
            return defaultTeachers;
        }
    }

    function save(teachers) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
    }

    function makeId(name) {
        const slug = String(name || "guru").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return `${slug || "guru"}-${Date.now()}`;
    }

    function assetPath(path) {
        if (!path) return "";
        if (path.startsWith("data:") || path.startsWith("http") || path.startsWith("/")) return path;

        const isGuruPage = location.pathname.includes("/page/GURU/") || location.pathname.includes("\\page\\GURU\\");
        const isDashboard = location.pathname.toLowerCase().endsWith("/dashboard.html") || location.pathname.toLowerCase().endsWith("\\dashboard.html");
        if (isGuruPage) return `../../${path}`;
        if (isDashboard) return `PROJECT KP SETIA NEGARA/${path}`;
        return path;
    }

    function getTeachers() {
        return safeRead();
    }

    function setTeachers(teachers) {
        save(teachers);
    }

    function getTeacher(id) {
        return getTeachers().find((teacher) => teacher.id === id);
    }

    function addTeacher(data) {
        const teachers = getTeachers();
        const teacher = { ...data, id: makeId(data.nama), foto: data.foto || DEFAULT_PHOTO };
        teachers.push(teacher);
        save(teachers);
        return teacher;
    }

    function updateTeacher(id, data) {
        const teachers = getTeachers().map((teacher) => teacher.id === id ? { ...teacher, ...data, id } : teacher);
        save(teachers);
    }

    function deleteTeacher(id) {
        save(getTeachers().filter((teacher) => teacher.id !== id));
    }

    function readTeacherFromPageNumber() {
        const match = decodeURIComponent(location.pathname).match(/guru\s*(\d+)\.html/i);
        return match ? `guru-${match[1]}` : "";
    }

    function teacherDetailUrl(id) {
        return `guru 1.html?id=${encodeURIComponent(id)}`;
    }

    function renderHomeTeacherSlider() {
        const track = document.getElementById("track");
        if (!track) return;

        const teachers = getTeachers();
        track.innerHTML = teachers.map((teacher) => `
            <a href="page/GURU/${teacherDetailUrl(teacher.id)}" class="card">
                <img src="${assetPath(teacher.foto)}" alt="${teacher.nama}">
                <div class="card-content">
                    <h3>${teacher.nama}</h3>
                    <p>${teacher.mapel || "-"}</p>
                    <div class="status">${teacher.status || "Aktif"}</div>
                </div>
            </a>
        `).join("");
    }

    function renderTeacherListPage() {
        const grid = document.querySelector(".guru-page-grid");
        if (!grid) return;

        const teachers = getTeachers();
        grid.innerHTML = teachers.map((teacher) => `
            <a href="${teacherDetailUrl(teacher.id)}" class="guru-page-card">
                <img src="${assetPath(teacher.foto)}" alt="${teacher.nama}">
                <div class="guru-page-info">
                    <h3>${teacher.nama}</h3>
                    <p>${teacher.mapel || "-"}</p>
                    <span>${teacher.status || "Aktif"}</span>
                </div>
            </a>
        `).join("");
    }

    function renderTeacherDetailPage() {
        const detailBox = document.querySelector(".guru-detail-box");
        if (!detailBox) return;

        const params = new URLSearchParams(location.search);
        const teacherId = params.get("id") || readTeacherFromPageNumber();
        const teacher = getTeacher(teacherId) || getTeachers()[0];
        if (!teacher) return;

        const items = [
            ["NIP", teacher.nip],
            ["Jenis Kelamin", teacher.jenisKelamin],
            ["Pendidikan", teacher.pendidikan],
            ["Status Kepegawaian", teacher.status],
            ["Jabatan", teacher.jabatan],
            ["Tugas Tambahan", teacher.tugas],
            ["Mulai Mengajar", teacher.mulai],
            ["Email", teacher.email],
            ["Instagram", teacher.instagram],
            ["Facebook", teacher.facebook],
            ["TikTok", teacher.tiktok]
        ];

        detailBox.innerHTML = `
            <div class="guru-photo">
                <img src="${assetPath(teacher.foto)}" alt="Foto ${teacher.nama}">
            </div>
            <div class="guru-detail-content">
                <h2>${teacher.nama}</h2>
                <h4>Guru Mata Pelajaran ${teacher.mapel || "-"}</h4>
                <div class="guru-data-grid">
                    ${items.map(([label, value]) => `
                        <div class="guru-item">
                            <span>${label}</span>
                            <p>${value || "-"}</p>
                        </div>
                    `).join("")}
                </div>
                <div class="guru-deskripsi">
                    <p>${teacher.deskripsi || "-"}</p>
                </div>
            </div>
        `;
    }

    window.GuruData = {
        DEFAULT_PHOTO,
        getTeachers,
        setTeachers,
        getTeacher,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        assetPath,
        renderHomeTeacherSlider,
        renderTeacherListPage,
        renderTeacherDetailPage
    };
})();
