import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
	client = new Client();
	databases;
	storage;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{ title, content, featuredImage, status, userId }
			);
		} catch (error) {
			console.log('Appwrite service :: createPost :: error', error);
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug,
				{ title, content, featuredImage, status }
			);
		} catch (error) {
			console.log('Appwrite service :: updatePost :: error', error);
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log('Appwrite service :: deletePost :: error', error);
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				slug
			);
		} catch (error) {
			console.log('Appwrite service :: getPost :: error', error);
			return false;
		}
	}

	async getPosts(queries = [Query.equal('status', 'active')]) {
		try {
			return await this.databases.listDocuments(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				queries
			);
		} catch (error) {
			console.log('Appwrite service :: getPosts :: error', error);
			return false;
		}
	}

	// file upload services

	async uploadFile(file) {
		try {
			return await this.storage.createFile(
				conf.appwriteStorageId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log('Appwrite service :: uploadfile :: error', error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(conf.appwriteStorageId, fileId);
			return true;
		} catch (error) {
			console.log('Appwrite service :: uploadfile :: error', error);
			return false;
		}
	}

	async downloadFile(fileId) {
		try {
			this.storage.getFileDownload(conf.appwriteStorageId, fileId);
			return true;
		} catch (error) {
			console.log('Appwrite service :: downloadFile :: error', error);
			return false;
		}
	}

	getFilePreview(fileId) {
		return this.storage.getFilePreview(conf.appwriteStorageId, fileId);
	}
}

const service = new Service();

export default service;
