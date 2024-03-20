import { defineStore } from 'pinia'
import type { User } from '../types/users'
import type { LaravelResource } from '../types/laravel'
type DummyResponse<T> = {
  data: T
}

export const useRootStore = defineStore('root', () => {
  const getData = async (): Promise<DummyResponse<LaravelResource<User>>> => {
    return {
      data: {
        total: 50,
        per_page: 15,
        current_page: 1,
        last_page: 4,
        first_page_url: 'http://laravel.app?page=1',
        last_page_url: 'http://laravel.app?page=4',
        next_page_url: 'http://laravel.app?page=2',
        prev_page_url: null,
        path: 'http://laravel.app',
        from: 1,
        to: 15,
        data: [
          {
            id: 1,
            name: 'John Doe',
            email: 'john@gmail.com'
          },
          {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@gmail.com'
          }
        ]
      }
    }
  }

  return {
    getData
  }
})
