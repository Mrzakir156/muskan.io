// Three.js 3D एनिमेशन
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threejs-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 3D दिल
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(0, -0.3, -0.5, -0.5, -0.5, 0);
heartShape.bezierCurveTo(-0.5, 0.5, 0, 0.8, 0, 0.5);
heartShape.bezierCurveTo(0, 0.8, 0.5, 0.5, 0.5, 0);
heartShape.bezierCurveTo(0.5, -0.5, 0, -0.3, 0, 0);
const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
const heartMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const heart = new THREE.Mesh(heartGeometry, heartMaterial);
heart.position.set(-2, 1, 0);
scene.add(heart);

// 3D गुलाब (सिंपल सिलेंडर और पंखुड़ियाँ)
const roseStemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
const roseStemMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const roseStem = new THREE.Mesh(roseStemGeometry, roseStemMaterial);
roseStem.position.set(2, 0, 0);
scene.add(roseStem);

const rosePetalGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const rosePetalMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const rosePetal = new THREE.Mesh(rosePetalGeometry, rosePetalMaterial);
rosePetal.position.set(2, 0.5, 0);
scene.add(rosePetal);

// 3D गुड्डा-गुड़िया
const dollGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const dollMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
const doll1 = new THREE.Mesh(dollGeometry, dollMaterial); // गुड्डा
doll1.position.set(-1, -1, 0);
scene.add(doll1);

const doll2 = new THREE.Mesh(dollGeometry, dollMaterial); // गुड़िया
doll2.position.set(1, -1, 0);
scene.add(doll2);

// 3D हार्ट लाइन्स
const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff69b4 });
const points = [];
for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
    const x = 0.5 * Math.sin(t) * (1 + Math.cos(t));
    const y = 0.5 * Math.sin(t) * Math.cos(t);
    points.push(new THREE.Vector3(x, y, 0));
}
const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const heartLine = new THREE.Line(lineGeometry, lineMaterial);
heartLine.position.set(0, -2, 0);
scene.add(heartLine);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    heart.rotation.x += 0.01;
    heart.rotation.y += 0.01;
    roseStem.rotation.y += 0.01;
    rosePetal.rotation.y += 0.01;
    doll1.rotation.y += 0.01;
    doll2.rotation.y += 0.01;
    heartLine.rotation.z += 0.01;
    renderer.render(scene, camera);
}
animate();

// हार्ट पार्टिकल्स
particlesJS("particles-js", {
    particles: {
        number: { value: 150 },
        color: { value: "#ff0000" },
        shape: { type: "heart" },
        opacity: { value: 0.8 },
        size: { value: 6 },
        move: { speed: 4 }
    },
    interactivity: {
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    }
});

// नई तस्वीरें जोड़ने का फंक्शन
function addPhotos() {
    const input = document.getElementById('photo-input');
    const gallery = document.getElementById('photo-gallery');
    const files = input.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = "मुस्कान की नई तस्वीर";
            img.className = "gallery-img";
            gallery.appendChild(img);
        };

        reader.readAsDataURL(file);
    }
}

// शेयर फंक्शन
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: 'मेरे पति ने मेरे लिए यह बनाया!',
            text: 'मुस्कान, देखो, कितना खूबसूरत है!',
            url: window.location.href
        });
    } else {
        alert('यह डिवाइस शेयरिंग को सपोर्ट नहीं करता। लिंक कॉपी करें!');
    }
}