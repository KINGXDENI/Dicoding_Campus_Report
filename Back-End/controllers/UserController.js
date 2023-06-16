// controllers/userController.js
import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';

const UserController = {
    login: async (req, res) => {
      try {
        const {
          email,
          nim,
          password
        } = req.body;
        let user;

        if (email) {
          // Jika email tersedia, cari pengguna berdasarkan email
          user = await User.findOne({
            where: {
              email
            }
          });
        } else if (nim) {
          // Jika nim tersedia, cari pengguna berdasarkan nim
          user = await User.findOne({
            where: {
              nim
            }
          });
        } else {
          // Jika email dan nim tidak tersedia, kembalikan respons error
          return res.status(400).json({
            message: 'Please provide email or NIM'
          });
        }

        if (!user) {
          return res.status(401).json({
            message: 'Invalid credentials'
          });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return res.status(401).json({
            message: 'Invalid credentials'
          });
        }

        if (user.role === 'admin') {
          return res.status(200).json({
            id: user.id,
            role: 'admin',
            message: 'Admin login successful',
          });
        } else {
          return res.status(200).json({
            id: user.id,
            role: 'user',
            message: 'User login successful',
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
          message: 'Internal server error'
        });
      }
    },



  register: async (req, res) => {
    try {
      const { email, password, role, nama, nim, jurusan, fakultas } = req.body;

      // Cek apakah pengguna dengan email tersebut sudah ada di database
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email is already registered' });
      }

      // Hash password sebelum disimpan ke database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Tambahkan data pengguna baru ke database
      const newUser = await User.create({
        email,
        password: hashedPassword,
        role,
        nama,
        nim,
        jurusan,
        fakultas
      });

      if (newUser) {
        return res.status(201).json({ message: 'User successfully registered'});
      } else {
        return res.status(500).json({ message: 'Failed to register user' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
  getUser: async (req, res) => {
    try {
      const {
        userId
      } = req.params;

      // Cari pengguna berdasarkan ID
      const user = await User.findOne({
        where: {
          id: userId
        }
      });

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      // Mengembalikan data pengguna
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error while getting user:', error);
      return res.status(500).json({
        message: 'Internal server error'
      });
    }
  }
};

export default UserController;
