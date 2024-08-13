import { expect, test } from '@playwright/test'

test('should create a new room', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  await page.getByRole('textbox', { name: 'Nome da sala' }).fill('Teste');
  await page.getByRole('button', { name: 'Criar sala' }).click();

  const message = page.getByText('Room ID >>>> 7645c730-5412-4632-a7cd-67bf8babea98')

  await expect(message).toBeVisible()
});

test('should crate a new message', async ({ page }) => {
  await page.goto('/room/7645c730-5412-4632-a7cd-67bf8babea98', { waitUntil: 'networkidle' })

  await page.getByRole('textbox', { name: 'Qual a sua pergunta?' }).fill('Nova pergunta');
  await page.getByRole('button', { name: 'Criar pergunta' }).click();

  await expect(page.getByText('Mensagem criada com sucesso!')).toBeVisible()
});

test('should receive a reaction', async ({ page }) => {
  await page.goto('/room/7645c730-5412-4632-a7cd-67bf8babea98', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Curtir pergunta (0)' }).click();

  await expect(page.getByText('Mensagem curtida com sucesso!')).toBeVisible()
})
