


// -----------------------------
// PAGE TRANSITION
// -----------------------------

const pt = document.querySelector('.page-transition');

if (pt) {
    // Briefly show the logo, then slide the overlay away
    const logo = pt.querySelector('.pt-logo');

    requestAnimationFrame(() => {
        if (logo) {
            logo.style.opacity = '1';
            logo.style.transform = 'scale(1)';
        }
    });

    setTimeout(() => {
        pt.classList.add('out');
    }, 650);
}

// Trigger slide-in on all internal links before navigating
document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            pt.classList.remove('out');
            pt.classList.add('in');
            setTimeout(() => { window.location.href = href; }, 600);
        });
    }
});

// -----------------------------
// SERVICE → PROJECT TYPE LOGIC
// -----------------------------

const service = document.getElementById("service");
const projectType = document.getElementById("projectType");

const services = {
    design: ["Logo", "Poster", "Album Cover", "Certificate", "other"],
    video: ["Short Video", "Advertisement", "Short Film", "Music Video", "Other"],
    motion: ["Lyrics Animation", "Cartoon", "Product Animation", "Other"],
    music: ["Mixing & Mastering", "Beat Production", "Melody Production", "Recording Coaching"]
};

if (service && projectType) {
    service.addEventListener("change", () => {

        projectType.innerHTML = `<option value="">Choose Type</option>`;

        const list = services[service.value];
        if (!list) return;

        list.forEach(type => {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            projectType.appendChild(option);
        });
    });
}


// -----------------------------
// AGE AUTO CALCULATION
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {

    const birthDate = new Date(2008, 4, 16); // May 16 2008
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }


    }
);

const form = document.getElementById("projectForm");
if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const templateParams = {
            name: form.elements["name"].value,
            family_name: form.elements["family_name"].value,
            phone: form.elements["phone"].value,
            email: form.elements["email"].value,
            age: form.elements["age"].value,
            service: form.elements["service"].value,
            project_type: form.elements["project_type"].value,
            description: form.elements["description"].value,
            budget: form.elements["budget"].value,
            deadline: form.elements["deadline"].value
        };

        // Send the request to yourself
        emailjs.send(
            "service_jy4fsuh",
            "template_n8d8rlb",
            templateParams
        )
        .then(function () {
            // Send auto-reply to the client
            return emailjs.send(
                "service_jy4fsuh",
                "template_9kgrfac",
                templateParams
            );
        })
        .then(function () {
            
            form.reset();
            window.location.href = "contact.html";
        })
        .catch(function (error) {
            console.error("EmailJS Error:", error);
            alert("Failed to send request.");
        });
    });
}