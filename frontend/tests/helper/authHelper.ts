import { Page, expect } from '@playwright/test';

export async function registerAndLoginUser(page: Page) {

    const uniqueId = Date.now();
    const testEmail = `test_${uniqueId}@snailbet.com`;
    const testPassword = 'Atinale#45';

    // Registro de un nuevo usuario
    await page.goto('http://localhost:5173/register');

    await page.getByPlaceholder('Ingresa tu nombre completo').fill('Test User');
    await page.getByPlaceholder('Ingresa tu correo electrónico').fill(testEmail);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(testPassword);
    await page.getByPlaceholder('Repite tu contraseña').fill(testPassword);

    await page.getByRole('button', { name: 'Regístrate' }).click();

    // Inicio de sesion
    await page.waitForURL('**/login');
    await page.getByPlaceholder('Ingresa tu correo electrónico').fill(testEmail);
    await page.getByPlaceholder('Ingresa tu contraseña').fill(testPassword);
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // Verificacion de dashboard
    await expect(page.getByText('Bienvenido a SnailBet')).toBeVisible();

    return {testEmail, testPassword};
}