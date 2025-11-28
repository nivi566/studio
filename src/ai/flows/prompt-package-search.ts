'use server';

/**
 * @fileOverview This file defines a Genkit flow for searching packages by description.
 *
 * - promptPackageSearch - An exported function that triggers the package search flow.
 * - PromptPackageSearchInput - The input type for the promptPackageSearch function.
 * - PromptPackageSearchOutput - The output type for the promptPackageSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PromptPackageSearchInputSchema = z.object({
  packageDescription: z
    .string()
    .describe('The description of the package to search for.'),
});

export type PromptPackageSearchInput = z.infer<typeof PromptPackageSearchInputSchema>;

const PromptPackageSearchOutputSchema = z.object({
  searchResults: z
    .string()
    .describe('The search results based on the package description.'),
});

export type PromptPackageSearchOutput = z.infer<typeof PromptPackageSearchOutputSchema>;

export async function promptPackageSearch(
  input: PromptPackageSearchInput
): Promise<PromptPackageSearchOutput> {
  return promptPackageSearchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'promptPackageSearchPrompt',
  input: {schema: PromptPackageSearchInputSchema},
  output: {schema: PromptPackageSearchOutputSchema},
  prompt: `You are a search assistant helping users find packages based on their descriptions.
  Based on the following package description, find the most relevant search results.
  Package Description: {{{packageDescription}}}
  Return the search results in a concise and informative manner.
  `,
});

const promptPackageSearchFlow = ai.defineFlow(
  {
    name: 'promptPackageSearchFlow',
    inputSchema: PromptPackageSearchInputSchema,
    outputSchema: PromptPackageSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
