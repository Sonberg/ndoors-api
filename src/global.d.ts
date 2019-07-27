interface User {
	name: string;
	email: string;
}

interface Controller {
	all(req: Express.Request, res: Express.Response): void;
	get(req: Express.Request, res: Express.Response): void;
	post(req: Express.Request, res: Express.Response): void;
	patch(req: Express.Request, res: Express.Response): void;
	put(req: Express.Request, res: Express.Response): void;
}

interface ValidationError {
	message: string;
	field: string;
}
