import * as AWS from 'aws-sdk';
import { Injectable, Logger } from '@nestjs/common';
import toStream = require('buffer-to-stream');
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

import { ConfigService } from '@nestjs/config';
const configService = new ConfigService();

@Injectable()
export class UploadService {
    private awsService = null;
    constructor() {
        this.awsService = new AWS.S3({
            accessKeyId: configService.get('AWS_S3.ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_S3.SECRET_ACCESS_KEY'),
        });
    }

    public async uploadMediaToCloudinary(file: any): Promise<UploadApiResponse | UploadApiErrorResponse> {
        Logger.log('Uploading file to cloudinary');
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        });
    }

    public async uploadMedia(file: any, filename?: string) {
        Logger.log('Uploading file to s3');
        try {
            const ext = file.originalName
                ? file.originalName.split('.')[1]
                : file.originalname.split('.')[1];
            const originalFIleName = file.originalName
                ? file.originalName.split('.')[0]
                : file.originalname.split('.')[0];

            const fileName = filename ? filename + originalFIleName + '.' + ext : `${new Date().getTime()}.${ext}`;

            const params = {
                Bucket: configService.get('AWS_S3.BUCKET'),
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read',
            };
            const res: any = await new Promise((resolve, reject) => {
                this.awsService.upload(params, (err, data) =>
                    err == null ? resolve(data) : reject(err),
                );
            });

            return res.Location;
        } catch (err) {
            throw err;
        }
    }

    public async deleteMedia(fileUrl: string) {
        Logger.debug(`Deleting file: ${fileUrl} from s3`);
        const words = fileUrl.split('/')
        const Key = words[words.length - 1]

        const res: any = await new Promise((resolve, reject) => {
            this.awsService.deleteObject(
                {
                    Bucket: configService.get('AWS_S3.BUCKET'),
                    Key,
                },
                (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                },
            );
        });
        return res;
    }

    public async updateMedia(fileUrl: string, file: any) {
        Logger.debug(`Updating file: ${fileUrl} in s3`);

        if (fileUrl && fileUrl.length > 2) {
            await this.deleteMedia(fileUrl);
        }
        return await this.uploadMedia(file);
    }
}