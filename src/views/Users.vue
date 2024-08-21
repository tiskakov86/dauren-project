<template>
  <div class="user-management">
    <h1>Управление пользователями</h1>
    <div class="table-container">
      <table class="table b-table table-bordered b-table-no-border-collapse">
        <thead>
          <tr>
            <th>Логин</th>
            <th>Kato Code</th>
            <th>Роли</th>
            <th>Email</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="user.login === 'тест-0-0-тест'">
            <td v-if="!user.isEditing">{{ user.login }}</td>
            <td v-else>
              <b-input v-model="user.login" disabled />
            </td> 

            <td v-if="!user.isEditing">{{ user.katoCode }}</td>
            <td v-else>
              <b-input v-model="user.katoCode" type="number" />
            </td>

            <td v-if="!user.isEditing">{{ user.roles.join(', ') }}</td>
            <td v-else>
              <b-input v-model="user.roles" placeholder="Роли" />
            </td>

            <td v-if="!user.isEditing">{{ user.email }}</td>
            <td v-else>
              <b-input v-model="user.email" type="email" />
            </td>

            <td v-if="!user.isEditing">
              <b-button class="btn-button" variant="primary" @click="editUser">Редактировать</b-button>
            </td>
            <td v-else>
              <b-button class="btn-button" variant="success" @click="saveUser">Сохранить</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="user.isEditing" class="password-modal">
      <h3>Введите новый пароль</h3>
      <b-input v-model="newPassword" type="password" placeholder="Новый пароль" />
      <b-input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль" />
      <b-button class="btn-button" variant="success" @click="savePassword">Сохранить пароль</b-button>
      <b-button class="btn-button" variant="light" @click="cancelEdit">Отмена</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '@/assets/css/b-table.css';

export default {
  name: 'UserManagement',
  data() {
    return {
      user: {
        login: 'тест-0-0-тест',
        katoCode: 12345,
        roles: [0],
        email: 'user@example.com',
        isEditing: false,
      },
      newPassword: '',
      confirmPassword: '',
    };
  },
  methods: {
    editUser() {
      this.user.isEditing = true;
    },
    async saveUser() {
      if (this.newPassword !== this.confirmPassword) {
        alert('Пароли не совпадают!');
        return;
      }
      try {
        const payload = {
          login: this.user.login,
          katoCode: this.user.katoCode,
          roles: this.user.roles,
          email: this.user.email,
          password: this.newPassword || 'string', // Если пароль не указан, передаем старый пароль
        };
        await axios.post('http://85.159.27.162:85/api/Account/SignUp', payload);
        this.user.isEditing = false;
        this.clearPasswordFields();
      } catch (error) {
        console.error('Ошибка при сохранении пользователя:', error);
      }
    },
    savePassword() {
      this.saveUser();
    },
    cancelEdit() {
      this.user.isEditing = false;
      this.clearPasswordFields();
    },
    clearPasswordFields() {
      this.newPassword = '';
      this.confirmPassword = '';
    },
  },
};
</script>

<style scoped>
.user-management {
  padding: 20px;
  max-width: 100%;
  margin: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 6px 12px;
  margin-top: 10px;
  cursor: pointer;
}

.password-modal {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
}
</style>
