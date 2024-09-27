import axios from 'axios';
import personsService from './persons';

jest.mock('axios');

describe('persons service', () => {
  test('fetches persons from API', async () => {
    const persons = [{ name: 'John Doe', number: '123-456', id: 1 }];
    axios.get.mockResolvedValue({ data: persons });

    const result = await personsService.getAll();
    expect(result).toEqual(persons);
  });

  test('adds a new person', async () => {
    const newPerson = { name: 'Jane Doe', number: '789-012' };
    axios.post.mockResolvedValue({ data: newPerson });

    const result = await personsService.create(newPerson);
    expect(result).toEqual(newPerson);
  });

  test('updates an existing person', async () => {
    const updatedPerson = { id: 1, name: 'John Doe', number: '555-555' };
    axios.put.mockResolvedValue({ data: updatedPerson });

    const result = await personsService.update(1, updatedPerson);
    expect(result).toEqual(updatedPerson);
  });

  test('deletes a person', async () => {
    axios.delete.mockResolvedValueOnce({});  // Simula una respuesta vacía
  
    const result = await personsService.eliminar(1);
    expect(result).toEqual({});  // Verifica que se devuelva un objeto vacío
  });
});
