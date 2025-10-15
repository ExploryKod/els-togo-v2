/**
 * Sets up the AI Assist plugin with preset prompts for association project content creation
 */

import { assist } from "@sanity/assist";

// Import project schema from local schemas
import project from "../schemas/documents/project";

export const assistWithPresets = () =>
  assist({
    __presets: {
      [project.name]: {
        fields: [
          {
            /**
             * Creates project description from the project title and category
             */
            path: "description",
            instructions: [
              {
                _key: "preset-instruction-1",
                title: "Generate project description",
                icon: "block-content",
                prompt: [
                  {
                    _key: "86e70087d4d5",
                    markDefs: [],
                    children: [
                      {
                        _type: "span",
                        marks: [],
                        text: "Given the project title ",
                        _key: "6b5d5d6a63cf0",
                      },
                      {
                        path: "title",
                        _type: "sanity.assist.instruction.fieldRef",
                        _key: "0132742d463b",
                      },
                      {
                        _type: "span",
                        marks: [],
                        text: " and category ",
                        _key: "a02c9ab4eb2d",
                      },
                      {
                        _type: "sanity.assist.instruction.fieldRef",
                        _key: "f208ef240062",
                        path: "category",
                      },
                      {
                        text: ", generate a comprehensive project description for an association project. The description should be structured, informative, and tailored to the project category. Include project objectives, methodology, expected outcomes, and community impact.",
                        _key: "8ecfa74a8487",
                        _type: "span",
                        marks: [],
                      },
                    ],
                    _type: "block",
                    style: "normal",
                  },
                ],
              },
            ],
          },
          {
            /**
             * Summarize content into the project extract field
             */
            path: "accroche",
            instructions: [
              {
                _key: "preset-instruction-2",
                title: "Summarize project",
                icon: "blockquote",
                prompt: [
                  {
                    markDefs: [],
                    children: [
                      {
                        _key: "650a0dcc327d",
                        _type: "span",
                        marks: [],
                        text: "Create a short project summary based on ",
                      },
                      {
                        path: "description",
                        _type: "sanity.assist.instruction.fieldRef",
                        _key: "c62d14c73496",
                      },
                      {
                        _key: "38e043efa606",
                        _type: "span",
                        marks: [],
                        text: " that highlights the key objectives and expected impact. Keep it concise and focused on the most important aspects of the project.",
                      },
                    ],
                    _type: "block",
                    style: "normal",
                    _key: "392c618784b0",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  });