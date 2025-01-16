import conf from '../conf/conf';
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
				ID.unique(),
				{ title, content, featuredImage, status, userId }
			);
		} catch (error) {
			console.log('Appwrite serive :: createPost :: error', error);
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				ID.unique(),
				{ title, content, featuredImage, status }
			);
		} catch (error) {
			console.log('Appwrite serive :: updatePost :: error', error);
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
			console.log('Appwrite serive :: deletePost :: error', error);
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
			console.log('Appwrite serive :: getPost :: error', error);
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
			console.log('Appwrite serive :: getPosts :: error', error);
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
			console.log('Appwrite serive :: uploadfile :: error', error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(conf.appwriteStorageId, fileId);
			return true;
		} catch (error) {
			console.log('Appwrite serive :: uploadfile :: error', error);
			return false;
		}
	}

	getFilePreview(fileId) {
		return this.storage.getFilePreview(conf.appwriteStorageId, fileId);
	}
}

const service = new Service();

export default service;
