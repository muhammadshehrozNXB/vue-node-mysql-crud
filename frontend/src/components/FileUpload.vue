<template>
    <div class="file-upload">
        <h2>Upload File</h2>
        <form @submit.prevent="uploadFile">
            <div class="input-group">
                <label for="name">Name:</label>
                <input type="text" v-model="fileDetails.name" id="name" required />
            </div>

            <div class="input-group">
                <label for="description">Description:</label>
                <textarea v-model="fileDetails.description" id="description" required></textarea>
            </div>

            <div class="input-group">
                <label for="file">Choose a file:</label>
                <input type="file" ref="fileInput" required />
            </div>

            <button type="submit" class="submit-btn">Upload</button>
        </form>

        <div v-if="files.length" class="file-list">
            <h3>Uploaded Files</h3>
            <ul>
                <li v-for="file in files" :key="file.id">
                    <strong>{{ file.name }}</strong> ({{ file.filename }})
                    <p>{{ file.description }}</p>

                    <button @click="editFile(file)">Edit</button>
                    <button @click="deleteFile(file.id)">Delete</button>
                </li>
            </ul>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" class="edit-modal">
            <div class="modal-content">
                <h3>Edit File</h3>
                <label for="editName">Name:</label>
                <input type="text" v-model="editDetails.name" id="editName" />
                <label for="editDescription">Description:</label>
                <textarea v-model="editDetails.description" id="editDescription"></textarea>
                <button @click="updateFile">Save Changes</button>
                <button @click="closeEditModal">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                files: [],
                fileDetails: {
                    name: '',
                    description: ''
                },
                showEditModal: false,
                editDetails: {
                    id: null,
                    name: '',
                    description: ''
                }
            };
        },
        methods: {
            // Upload file
            async uploadFile() {
                const fileInput = this.$refs.fileInput;
                const formData = new FormData();
                formData.append('file', fileInput.files[0]);
                formData.append('name', this.fileDetails.name);
                formData.append('description', this.fileDetails.description);

                try {
                    await axios.post('http://localhost:5000/api/files', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    this.fetchFiles();  // Refresh the file list
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            },

            // Fetch all files
            async fetchFiles() {
                try {
                    const response = await axios.get('http://localhost:5000/api/files');
                    this.files = response.data;
                } catch (error) {
                    console.error('Error fetching files:', error);
                }
            },

            // Edit file details
            editFile(file) {
                this.editDetails = { ...file };  // Copy file data into editDetails
                this.showEditModal = true;  // Show the edit modal
            },

            // Update file details
            async updateFile() {
                try {
                    await axios.put(`http://localhost:5000/api/files/${this.editDetails.id}`, {
                        name: this.editDetails.name,
                        description: this.editDetails.description
                    });
                    this.fetchFiles();  // Refresh the file list
                    this.closeEditModal();  // Close the edit modal
                } catch (error) {
                    console.error('Error updating file:', error);
                }
            },

            // Close the edit modal
            closeEditModal() {
                this.showEditModal = false;
                this.editDetails = { id: null, name: '', description: '' };  // Reset edit details
            },

            // Delete file
            async deleteFile(fileId) {
                try {
                    await axios.delete(`http://localhost:5000/api/files/${fileId}`);
                    this.fetchFiles();  // Refresh the file list after deletion
                } catch (error) {
                    console.error('Error deleting file:', error);
                }
            }
        },
        mounted() {
            this.fetchFiles();  // Load files when component is mounted
        }
    };
</script>

<style scoped>
    /* Styling for FileUpload.vue */
    .file-upload {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    h2 {
        font-size: 24px;
        color: #333;
        margin-bottom: 20px;
    }

    .input-group {
        margin-bottom: 15px;
        width: 100%;
    }

    .input-group label {
        font-size: 16px;
        color: #555;
        display: block;
        margin-bottom: 8px;
    }

    .input-group input,
    .input-group textarea {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .input-group input[type="file"] {
        padding: 5px;
    }

    .submit-btn {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 12px 20px;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
    }

    .submit-btn:hover {
        background-color: #45a049;
    }

    .file-list {
        margin-top: 30px;
        width: 100%;
    }

    .file-list h3 {
        font-size: 22px;
        color: #333;
    }

    .file-list ul {
        list-style-type: none;
        padding: 0;
    }

    .file-list li {
        background-color: #f9f9f9;
        border: 1px solid #ddd;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 5px;
    }

    .file-list li button {
        background-color: #ff4d4d;
        color: white;
        border: none;
        padding: 5px 10px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 10px;
    }

    .file-list li button:hover {
        background-color: #e60000;
    }

    /* Modal styling */
    .edit-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        width: 300px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .modal-content button {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        margin-top: 10px;
    }

    .modal-content button:hover {
        background-color: #45a049;
    }
</style>
