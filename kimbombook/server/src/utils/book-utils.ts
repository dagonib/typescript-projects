import { newBookEntry } from "../types/types"
import { Category, Language } from "../enums"
import { isBoolean, isString } from "./general-utils"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseTitle = (titleFromRequest: any): string => {
  if (!isString(titleFromRequest)) {
    throw new Error('Incorrect or missing title')
  }
  return titleFromRequest
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseAuthor = (authorFromRequest: any): string => {
  if (!isString(authorFromRequest)) {
    throw new Error('Incorrect or missing author')
  }
  return authorFromRequest
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDescription = (descriptionFromRequest: any): string => {
  if (!isString(descriptionFromRequest)) {
    throw new Error('Incorrect or missing description')
  }
  return descriptionFromRequest
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseImageLink = (imageLinkFromRequest: any): string => {
  if (!isString(imageLinkFromRequest)) {
    throw new Error('Incorrect or missing ImageLink')
  }
  return imageLinkFromRequest
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseLink = (linkFromRequest: any): string => {
  if (!isString(linkFromRequest)) {
    throw new Error('Incorrect or missing Link')
  }
  return linkFromRequest
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseAvailable = (availableFromRequest: any): boolean => {
  if (!isBoolean(availableFromRequest)) {
    throw new Error('Incorrect or missin Available')
  }
  return availableFromRequest
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseCategory = (categoryFromRequest: any): Category => {
  if (!isString(categoryFromRequest) || !isCategory(categoryFromRequest)) {
    throw new Error('Incorrect or missin Category')
  }
  return categoryFromRequest
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseLanguage = (languageFromRequest: any): Language => {
  if (!isString(languageFromRequest) || !isLanguage(languageFromRequest)) {
    throw new Error('Incorrect or missin Language')
  }
  return languageFromRequest
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isCategory = (param: any): boolean => {
  return Object.values(Category).includes(param)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isLanguage = (param: any): boolean => {
  return Object.values(isLanguage).includes(param)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewBook = (object: any): newBookEntry => {
  const newBook: newBookEntry = {
    title: parseTitle(object.title),
    author: parseAuthor(object.author),
    description: parseDescription(object.description),
    category: parseCategory(object.category),
    language: parseLanguage(object.language),
    imageLink: parseImageLink(object.imageLink),
    link: parseLink(object.link),
    available: parseAvailable(object.available)
  }

  return newBook
}