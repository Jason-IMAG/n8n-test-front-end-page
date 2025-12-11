import { useState } from 'react';
import { getAssetUrl } from '@/apps/utils';

import classes from './ExamplePage.module.scss';
import { UserApi } from '@/apps/api/user/user.api';
import { FileInput, Button, Image, Text } from '@mantine/core';

function ExamplePage() {
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	// 處理圖片選擇
	const handleImageChange = (file: File | null) => {
		setImageFile(file);

		// 產生圖片預覽
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setImagePreview(null);
		}
	};

	// 上傳圖片到 API (n8n)
	const handleUploadImage = async () => {
		if (!imageFile) {
			alert('請先選擇圖片');
			return;
		}

		setIsUploading(true);

		try {
			// 使用 UserApi 上傳圖片
			const response = await UserApi.uploadImage(imageFile);

			console.log('上傳成功:', response.data);
			alert('圖片上傳成功！');

			// 清空選擇
			setImageFile(null);
			setImagePreview(null);
		} catch (error) {
			console.error('上傳錯誤:', error);
			alert('圖片上傳失敗，請重試');
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<>
			<div className={classes.examplePage}>
				<span>Example Page</span>
				<img src={getAssetUrl('/images/vector.png')} />

				{/* 圖片上傳區塊 */}
				<div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<FileInput label="傳張圖片給n8n" placeholder="點擊選擇圖片" accept="image/*" value={imageFile} onChange={handleImageChange} />

					{/* 圖片預覽 */}
					{imagePreview && (
						<div>
							<Text size="sm" style={{ marginBottom: '8px' }}>
								預覽：
							</Text>
							<Image src={imagePreview} alt="預覽圖片" style={{ maxWidth: '300px', maxHeight: '300px' }} />
						</div>
					)}

					{/* 上傳按鈕 */}
					<Button onClick={handleUploadImage} disabled={!imageFile || isUploading} loading={isUploading}>
						{isUploading ? '上傳中...' : '上傳到 n8n'}
					</Button>
				</div>
			</div>
		</>
	);
}

export default ExamplePage;
