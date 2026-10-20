import { test, expect } from '@playwright/test';

import { registerAndLoginUser } from './helper/authHelper';

test.describe('Flujo de carga de Saldo', () => {
    test('Debe realizar una carga de saldo exitosa y actualizar el dashboard', async({page}) => {
        await registerAndLoginUser(page);

        const saldoInicialText = await page.locator('p.text-4xl').innerText();
        const saldoInicial = parseFloat(saldoInicialText.replace('$', ''));

        await page.getByRole('button', { name: 'Cargar Saldo con SnailPay' }).click();

        await page.getByPlaceholder('Tu nombre').fill('Test User');
        await page.getByPlaceholder('Número de tarjeta').fill('4111111111111111');
        await page.getByPlaceholder('MM/AA').pressSequentially('1226');
        await page.getByPlaceholder('CVV').fill('123');
        await page.locator('#amount').fill('100');
        const response = page.waitForResponse('**/api/payment');

        await page.getByRole('button', { name: 'Cargar Saldo', exact: true }).click();
        await response;

        await expect(page.getByText('¡Pago exitoso!')).toBeVisible({ timeout: 30000});
        await page.getByRole('button', { name:"Cerrar", exact: true }).click();
        
        const saldoFinalText = await page.locator('p.text-4xl').innerText();
        const saldoFinal = parseFloat(saldoFinalText.replace('$', ''));
        expect(saldoFinal).toBeGreaterThan(saldoInicial);
        
    })
})