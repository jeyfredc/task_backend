import type { Request, Response } from "express";
export declare class TeamController {
    static findMemberByEmail: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static addMemberById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    static getProjectTeam: (req: Request, res: Response) => Promise<void>;
    static removeMemberById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
