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
          <tr v-for="user in users" :key="user.id">
            <td v-if="!user.isEditing">{{ user.login }}</td>
            <td v-else>
              <b-input v-model="user.login" disabled />
            </td>

            <td v-if="!user.isEditing">{{ user.katoCode }}</td>
            <td v-else>
              <b-input v-model="user.katoCode" type="number" />
            </td>

            <td v-if="!user.isEditing">{{ user.roles.map(role => role.roleId).join(', ') }}</td>
            <td v-else>
              <b-input v-model="user.roles" placeholder="Роли" />
            </td>

            <td v-if="!user.isEditing">{{ user.email }}</td>
            <td v-else>
              <b-input v-model="user.email" type="email" />
            </td>

            <td v-if="!user.isEditing">
              <b-button class="btn-button" variant="primary" @click="editUser(user)">Редактировать</b-button>
            </td>
            <td v-else>
              <b-button class="btn-button" variant="success" @click="saveUser(user)">Сохранить</b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="editedUser" class="password-modal">
      <h3>Введите новый пароль</h3>
      <b-input v-model="newPassword" type="password" placeholder="Новый пароль" />
      <b-input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль" />
      <b-button class="btn-button" variant="success" @click="savePassword">Сохранить пароль</b-button>
      <b-button class="btn-button" variant="light" @click="cancelEdit">Отмена</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';

@Component
export default class UserManagement extends Vue {
  users: Array<any> = [];
  editedUser: any = null;
  newPassword: string = '';
  confirmPassword: string = '';

  // Получение токена из хранилища Vuex
  private get token(): string | null {
    return this.$store.state.auth.token || null;
  }

  async created() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await axios.post(
        'http://85.159.27.162:85/api/Account/list',
        {},
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        }
      );
      this.users = response.data;
    } catch (error) {
      console.error('Ошибка при загрузке данных пользователей:', error);
    }
  }

  editUser(user: any) {
    user.isEditing = true;
    this.editedUser = user;
  }

  async saveUser(user: any) {
    if (this.newPassword && this.newPassword !== this.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }
    try {
      const payload = {
        login: user.login,
        katoCode: user.katoCode,
        roles: user.roles.map((role: any) => ({ roleId: role.roleId })),
        email: user.email,
        password: this.newPassword || 'string',
      };
      await axios.post('http://85.159.27.162:85/api/Account/SignUp', payload, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
        },
      });
      user.isEditing = false;
      this.clearPasswordFields();
      this.editedUser = null;
    } catch (error) {
      console.error('Ошибка при сохранении пользователя:', error);
    }
  }

  savePassword() {
    this.saveUser(this.editedUser);
  }

  cancelEdit() {
    if (this.editedUser) {
      this.editedUser.isEditing = false;
    }
    this.clearPasswordFields();
    this.editedUser = null;
  }

  clearPasswordFields() {
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
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
