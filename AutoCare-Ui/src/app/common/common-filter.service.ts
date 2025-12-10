import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonFilterService {

  /**
   * Remove Vietnamese diacritics & normalize string
   */
  private normalize(value: string): string {
    if (!value) return '';

    return value
      .toLowerCase()
      .normalize('NFD')                     // tách dấu
      .replace(/[\u0300-\u036f]/g, '')     // xoá dấu
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd')
      .trim();
  }

  /**
   * Generic filter by dynamic fields (no accent, no case sensitive)
   * @param data - source array
   * @param searchTerm - keyword
   * @param fields -  array of field paths to search in (supports nested fields with dot notation)
   */
  filter<T>(data: T[], searchTerm: string, fields: string[]): T[] {
    if (!searchTerm?.trim()) return data;

    const term = this.normalize(searchTerm);

    return data.filter(item =>
      fields.some(fieldPath => {
        const rawValue = this.getNestedValue(item, fieldPath);
        if (rawValue === null || rawValue === undefined) return false;

        const value = this.normalize(String(rawValue));
        return value.includes(term);
      })
    );
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => {
      return prev ? prev[curr] : null;
    }, obj);
  }
}
