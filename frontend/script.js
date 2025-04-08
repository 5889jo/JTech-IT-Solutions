const API = 'http://localhost:3000/api/students';

document.getElementById('studentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const course = document.getElementById('course').value;

  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age, course })
  });

  document.getElementById('studentForm').reset();
  loadStudents();
});

async function loadStudents() {
  const res = await fetch(API);
  const students = await res.json();
  const list = document.getElementById('studentList');
  list.innerHTML = '';
  students.forEach(s => {
    const item = document.createElement('li');
    item.innerHTML = `
      ${s.name} (${s.age}) - ${s.course}
      <button onclick="deleteStudent('${s._id}')">Delete</button>
    `;
    list.appendChild(item);
  });
}

async function deleteStudent(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadStudents();
}

loadStudents();
