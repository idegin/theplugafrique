/**
 * Auto-generated Documentation for The Plug Afrique Website CMS
 * Generated at: 2025-11-29T20:21:04.658Z
 */

export const IDEGIN_CLOUD_SECRET_KEY = process.env.IDEGIN_CLOUD_SECRET_KEY;
export const IDEGIN_CLOUD_BASE_URL = "https://idegin-cloud-backend.fly.dev/api/v1";

export type CMSFile = {
    id: string;
    filename: string;
    url: string;
    size: number;
    mimeType: string;
    uploadedAt: string;
}

export type PopulatedRelatedEntry<T = Record<string, unknown>> = {
    id: string;
    data: T;
}

export type CMSEntryMeta = {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type CMSPagination = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export type CMSListResponse<T> = {
    success: boolean;
    message: string;
    data: {
        entries: (CMSEntryMeta & { data: T })[];
        pagination: CMSPagination;
    };
}

export type CMSSingleResponse<T> = {
    success: boolean;
    message: string;
    data: CMSEntryMeta & { data: T };
}

export type CMSCountResponse = {
    success: boolean;
    message: string;
    data: { count: number };
}

export type CMSUpdateResponse<T> = CMSSingleResponse<T>;

export type CollectionSlug = "faq" | "author" | "blog-posts" | "categories" | "testimonials" | "selling-point" | "services";

export type Faq = {
    name: string;
    slug: string;
    answer: string;
}

export type Author = {
    name: string;
    slug: string;
    avatar: CMSFile;
    phone_number?: string | null;
    email_address?: string | null;
    about?: string | null;
    linkedin?: string | null;
    instagram?: string | null;
    role?: string | null;
}

export type BlogPosts = {
    name: string;
    slug: string;
    thumbnail: CMSFile;
    excerpt: string;
    categories: PopulatedRelatedEntry<Categories>[];
    author: PopulatedRelatedEntry<Author>;
    content: string;
}

export type Categories = {
    name: string;
    slug: string;
}

export type Testimonials = {
    name: string;
    slug: string;
    avatar_image: CMSFile;
    organization: string;
    content: string;
}

export type SellingPoint = {
    name: string;
    slug: string;
    content: string;
    bullet_points: ({ content: string })[];
}

export type Services = {
    name: string;
    slug: string;
    excerpt: string;
    cover_image: CMSFile;
    content: string;
}

export type CollectionTypeMap = {
    "faq": Faq;
    "author": Author;
    "blog-posts": BlogPosts;
    "categories": Categories;
    "testimonials": Testimonials;
    "selling-point": SellingPoint;
    "services": Services;
};

async function cmsRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${IDEGIN_CLOUD_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Authorization': `Bearer ${IDEGIN_CLOUD_SECRET_KEY}`,
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP ${response.status}`);
    }
    return response.json();
}

export async function getAll<S extends CollectionSlug>(
    slug: S,
    options?: { page?: number; limit?: number; search?: string }
): Promise<CMSListResponse<CollectionTypeMap[S]>> {
    const params = new URLSearchParams();
    if (options?.page) params.set('page', options.page.toString());
    if (options?.limit) params.set('limit', options.limit.toString());
    if (options?.search) params.set('search', options.search);
    const query = params.toString();
    return cmsRequest(`/public/cms/collections/${slug}${query ? `?${query}` : ''}`);
}

export async function getById<S extends CollectionSlug>(
    slug: S,
    id: string
): Promise<CMSSingleResponse<CollectionTypeMap[S]>> {
    return cmsRequest(`/public/cms/collections/${slug}/${id}`);
}

export async function getBySlug<S extends CollectionSlug>(
    slug: S,
    entrySlug: string
): Promise<CMSSingleResponse<CollectionTypeMap[S]>> {
    return cmsRequest(`/public/cms/collections/${slug}/slug/${entrySlug}`);
}

export async function getCount<S extends CollectionSlug>(slug: S): Promise<CMSCountResponse> {
    return cmsRequest(`/public/cms/collections/${slug}/count`);
}

export async function update<S extends CollectionSlug>(
    slug: S,
    id: string,
    data: Partial<CollectionTypeMap[S]>
): Promise<CMSUpdateResponse<CollectionTypeMap[S]>> {
    return cmsRequest(`/public/cms/collections/${slug}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

/*
================================================================================
                           API QUERY EXAMPLES
================================================================================

Base URL: https://idegin-cloud-backend.fly.dev/api/v1/public/cms
All requests require the Authorization header: Bearer <SECRET_KEY>

--------------------------------------------------------------------------------
                              BASIC QUERIES
--------------------------------------------------------------------------------

# Get all entries with pagination
GET /collections/faq?page=1&limit=10

# Search entries
GET /collections/faq?search=hello&searchFields=name

# Get entry by ID
GET /collections/faq/entry-id-here

# Get entry by slug
GET /collections/faq/slug/my-entry-slug

# Get entry count
GET /collections/faq/count

--------------------------------------------------------------------------------
                              FILTERING
--------------------------------------------------------------------------------

# Filter operators: eq, ne, gt, gte, lt, lte, in, nin, contains, startsWith, endsWith

# Exact match
GET /collections/faq?filter[name][eq]=Hello World

# Not equal
GET /collections/faq?filter[status][ne]=draft

# Greater than / Less than (for numbers and dates)
GET /collections/faq?filter[price][gte]=100&filter[price][lte]=500

# Contains (partial match)
GET /collections/faq?filter[name][contains]=keyword

# Starts with / Ends with
GET /collections/faq?filter[name][startsWith]=Hello
GET /collections/faq?filter[name][endsWith]=World

# In list (comma-separated values)
GET /collections/faq?filter[status][in]=published,featured

# Not in list
GET /collections/faq?filter[status][nin]=draft,archived

# Multiple filters (AND logic)
GET /collections/faq?filter[status][eq]=published&filter[price][gte]=50

# Count with filters
GET /collections/faq/count?filter[status][eq]=published

--------------------------------------------------------------------------------
                              SORTING
--------------------------------------------------------------------------------

# Sort ascending
GET /collections/faq?sort=name

# Sort descending (prefix with -)
GET /collections/faq?sort=-createdAt

# Multiple sort fields (comma-separated)
GET /collections/faq?sort=-featured,name

--------------------------------------------------------------------------------
                           FIELD SELECTION
--------------------------------------------------------------------------------

# Select specific fields only (comma-separated)
GET /collections/faq?fields=name,slug,createdAt

# Combine with filtering and sorting
GET /collections/faq?filter[status][eq]=published&sort=-createdAt&fields=name,slug

--------------------------------------------------------------------------------
                          POPULATE CONTROL
--------------------------------------------------------------------------------

# By default, all relationship fields are populated

# Populate specific relationships only (comma-separated)
GET /collections/faq?populate=category

# Populate with field selection for related data
GET /collections/faq?populate[category]=name,slug

# Multiple relationships with field selection
GET /collections/faq?populate[category]=name&populate[author]=name,avatar

# Control populate depth
GET /collections/faq?populateDepth=2

--------------------------------------------------------------------------------
                            AGGREGATION
--------------------------------------------------------------------------------

# Count related entries (e.g., count posts per category)
GET /collections/categories?countRelation=faq&relationField=category

# Group by field with count
GET /collections/faq?groupBy=status

# Group by with aggregations
GET /collections/faq?groupBy=category&aggregate[views]=sum&aggregate[price]=avg

# Available aggregations: count, sum, avg, min, max

--------------------------------------------------------------------------------
                          DISTINCT VALUES
--------------------------------------------------------------------------------

# Get distinct values for a field
GET /collections/faq/distinct/status

GET /collections/faq/distinct/name

--------------------------------------------------------------------------------
                         COMPLETE EXAMPLES
--------------------------------------------------------------------------------

# Example 1: Blog listing with filters, sort, and field selection
GET /collections/faq?filter[status][eq]=published&sort=-createdAt&fields=name,slug,excerpt&page=1&limit=10

# Example 2: Search with pagination
GET /collections/faq?search=typescript&searchFields=name,content&page=1&limit=20

# Example 3: Related entries with selective population
GET /collections/faq?populate[category]=name,slug&populate[author]=name,avatar&fields=name,slug,category,author

# Example 4: Categories with post counts
GET /collections/categories?countRelation=faq&relationField=category

# Example 5: Entries in date range
GET /collections/faq?filter[createdAt][gte]=2024-01-01&filter[createdAt][lte]=2024-12-31&sort=-createdAt

================================================================================
*/