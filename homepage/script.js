document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');

    const fetchUsers = () => {
        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#user-table tbody');
                tableBody.innerHTML = ''; // เคลียร์ข้อมูลเก่าก่อนโหลดข้อมูลใหม่
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td><button class="delete-user" data-id="${user.id}">Delete</button></td>
                    `;
                    tableBody.appendChild(row);
                });

                document.querySelectorAll('.delete-user').forEach(button => {
                    button.addEventListener('click', function () {
                        const userId = this.dataset.id;
                        deleteUser(userId);
                    });
                });
            })
            .catch(error => console.error('Error fetching user data:', error));
    };

    const addUser = (name, email) => {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        })
        .then(response => response.json())
        .then(() => {
            fetchUsers(); // โหลดรายการผู้ใช้ใหม่หลังจากเพิ่มผู้ใช้
        })
        .catch(error => console.error('Error adding user:', error));
    };

    const deleteUser = (id) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => {
            fetchUsers(); // โหลดรายการผู้ใช้ใหม่หลังจากลบผู้ใช้
        })
        .catch(error => console.error('Error deleting user:', error));
    };

    document.querySelector('#add-user-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        addUser(name, email);
        this.reset(); // รีเซ็ตฟอร์มหลังจากเพิ่มผู้ใช้
    });

    fetchUsers(); // โหลดข้อมูลผู้ใช้เมื่อโหลดหน้า
});
